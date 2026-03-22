"""
Email Service for CareerVerse 2FA.

Sends OTP codes via Gmail SMTP for two-factor authentication.
Requires SMTP_EMAIL and SMTP_APP_PASSWORD environment variables.
"""

import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()


def send_otp_email(to_email: str, otp_code: str, purpose: str = "login") -> bool:
    """
    Send an OTP code to the user's email address.

    Args:
        to_email: Recipient email address.
        otp_code: The 6-digit OTP code to send.
        purpose: Either "login" or "setup" — changes the email subject/body.

    Returns:
        True if the email was sent successfully, False otherwise.
    """
    smtp_email = os.getenv("SMTP_EMAIL")
    smtp_password = os.getenv("SMTP_APP_PASSWORD")

    if not smtp_email or not smtp_password:
        print("❌ SMTP_EMAIL or SMTP_APP_PASSWORD not set in environment")
        return False

    # Build subject and body based on purpose
    if purpose == "setup":
        subject = "CareerVerse — Verify Your Two-Step Login Setup"
        heading = "Two-Step Login Setup"
        description = "You are enabling Two-Step Login on your CareerVerse account. Enter the code below to confirm setup."
    else:
        subject = "CareerVerse — Your Login Verification Code"
        heading = "Login Verification"
        description = "A sign-in attempt requires verification. Enter the code below to complete your login."

    html_body = f"""
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #0d1e16; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08);">
        <div style="height: 4px; background: linear-gradient(to right, #10b981, #14b8a6, #10b981);"></div>
        <div style="padding: 40px 32px;">
            <h2 style="color: #ffffff; font-size: 22px; margin: 0 0 8px 0;">{heading}</h2>
            <p style="color: #94a3b8; font-size: 14px; margin: 0 0 28px 0; line-height: 1.5;">
                {description}
            </p>
            <div style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 28px;">
                <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #10b981; font-family: monospace;">
                    {otp_code}
                </span>
            </div>
            <p style="color: #64748b; font-size: 13px; margin: 0 0 4px 0;">
                This code expires in <strong style="color: #94a3b8;">10 minutes</strong>.
            </p>
            <p style="color: #64748b; font-size: 13px; margin: 0;">
                If you did not request this code, please ignore this email.
            </p>
        </div>
        <div style="padding: 16px 32px; border-top: 1px solid rgba(255,255,255,0.05);">
            <p style="color: #475569; font-size: 12px; margin: 0; text-align: center;">
                CareerVerse &mdash; AI-Powered Career Intelligence
            </p>
        </div>
    </div>
    """

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"CareerVerse <{smtp_email}>"
        msg["To"] = to_email

        # Plain text fallback
        plain_text = f"Your CareerVerse verification code is: {otp_code}\n\nThis code expires in 10 minutes.\nIf you did not request this code, please ignore this email."
        msg.attach(MIMEText(plain_text, "plain"))
        msg.attach(MIMEText(html_body, "html"))

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(smtp_email, smtp_password)
            server.sendmail(smtp_email, to_email, msg.as_string())

        print(f"✅ OTP email sent to {to_email} (purpose: {purpose})")
        return True

    except Exception as e:
        print(f"❌ Failed to send OTP email: {str(e)}")
        return False
