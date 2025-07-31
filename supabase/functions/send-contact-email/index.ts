import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.0';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  turnstileToken: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    console.log("Processing contact form submission...");
    
    // Get request data
    const formData: ContactFormData = await req.json();
    const userAgent = req.headers.get("user-agent") || "";
    const clientIP = req.headers.get("x-forwarded-for") || 
                    req.headers.get("x-real-ip") || 
                    "unknown";

    console.log("Form data received:", {
      email: formData.email,
      subject: formData.subject,
      firstName: formData.firstName,
      lastName: formData.lastName
    });

    // Verify Turnstile token with Cloudflare
    const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
    if (!turnstileSecret) {
      console.error("TURNSTILE_SECRET_KEY not configured");
      return new Response(JSON.stringify({ 
        error: "Server configuration error" 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    console.log("Verifying Turnstile token...");
    const turnstileVerify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: turnstileSecret,
        response: formData.turnstileToken,
        remoteip: clientIP,
      }).toString(),
    });

    const turnstileResult = await turnstileVerify.json();
    console.log("Turnstile verification result:", turnstileResult);

    if (!turnstileResult.success) {
      console.error("Turnstile verification failed:", turnstileResult);
      return new Response(JSON.stringify({ 
        error: "Security verification failed" 
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store form submission in database
    console.log("Storing submission in database...");
    const { data: submission, error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        company: formData.company || null,
        subject: formData.subject,
        message: formData.message,
        turnstile_token: formData.turnstileToken,
        ip_address: clientIP,
        user_agent: userAgent,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(JSON.stringify({ 
        error: "Failed to save submission" 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    console.log("Submission stored with ID:", submission.id);

    // Send email using Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return new Response(JSON.stringify({ 
        error: "Email service not configured" 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const resend = new Resend(resendApiKey);

    console.log("Sending emails...");

    // Email to the site owner
    const ownerEmailResult = await resend.emails.send({
      from: "Contact Form <noreply@yourdomain.com>",
      to: ["chaitramalladad@proton.me"],
      subject: `New Contact Form Submission: ${formData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
            ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
            <p><strong>Subject:</strong> ${formData.subject}</p>
          </div>

          <div style="background: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #007bff; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${formData.message}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 8px; font-size: 12px; color: #6c757d;">
            <p><strong>Submission Details:</strong></p>
            <p>IP Address: ${clientIP}</p>
            <p>User Agent: ${userAgent}</p>
            <p>Submitted: ${new Date().toISOString()}</p>
            <p>Security Verified: ✅ Turnstile Verified</p>
          </div>
        </div>
      `,
    });

    // Confirmation email to the submitter
    const confirmationEmailResult = await resend.emails.send({
      from: "Chaitra Malladad <noreply@yourdomain.com>",
      to: [formData.email],
      subject: "Thank you for contacting me - Message received",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Thank You for Your Message
          </h2>
          
          <p>Hello ${formData.firstName},</p>
          
          <p>Thank you for reaching out! I have successfully received your message and will review it carefully.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Your Message Summary</h3>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <p><strong>What happens next?</strong></p>
          <ul style="line-height: 1.6;">
            <li>I typically respond to messages within 24-48 hours</li>
            <li>For urgent security matters, I'll prioritize accordingly</li>
            <li>You'll receive a response directly to this email address</li>
          </ul>

          <p>If you have any additional questions or need to add more information to your inquiry, please feel free to reply to this email.</p>

          <p>Best regards,<br>
          <strong>Chaitra Malladad</strong><br>
          Cybersecurity Professional</p>

          <div style="margin-top: 30px; padding: 15px; background: #e9ecef; border-radius: 8px; font-size: 12px; color: #6c757d;">
            <p>This is an automated confirmation email. Your message was securely transmitted and verified.</p>
          </div>
        </div>
      `,
    });

    console.log("Owner email result:", ownerEmailResult);
    console.log("Confirmation email result:", confirmationEmailResult);

    if (ownerEmailResult.error || confirmationEmailResult.error) {
      console.error("Email sending error:", {
        owner: ownerEmailResult.error,
        confirmation: confirmationEmailResult.error
      });
      
      // Still return success since the submission was saved
      return new Response(JSON.stringify({ 
        success: true,
        message: "Form submitted successfully, but there was an issue sending confirmation emails",
        submissionId: submission.id
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: "Form submitted successfully and emails sent",
      submissionId: submission.id
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(JSON.stringify({ 
      error: "Internal server error",
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
};

serve(handler);