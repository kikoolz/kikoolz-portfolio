const baseStyles = {
  body: `
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    background-color: #0a0a0a;
    margin: 0;
    padding: 0;
  `,
  container: `
    max-width: 520px;
    margin: 0 auto;
    padding: 40px 24px;
  `,
  card: `
    background: linear-gradient(135deg, #1a1a1a 0%, #141414 100%);
    border-radius: 20px;
    padding: 40px 32px;
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8);
  `,
  badge: `
    display: inline-block;
    background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
    border-radius: 9999px;
    padding: 6px 16px;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  `,
  heading: `
    font-size: 26px;
    font-weight: 700;
    color: #fafafa;
    margin: 24px 0 12px 0;
    line-height: 1.3;
    letter-spacing: -0.5px;
  `,
  paragraph: `
    font-size: 15px;
    line-height: 1.7;
    color: #a1a1aa;
    margin: 0 0 20px 0;
  `,
  divider: `
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    margin: 28px 0;
    border: none;
  `,
  highlight: `
    background: rgba(99,102,241,0.1);
    border-left: 3px solid #6366f1;
    padding: 16px 20px;
    border-radius: 8px;
    margin: 20px 0;
    color: #d4d4d8;
    font-size: 14px;
    line-height: 1.6;
  `,
  footer: `
    text-align: center;
    padding-top: 28px;
    color: #52525b;
    font-size: 12px;
    line-height: 1.6;
  `,
  ctaButton: `
    display: inline-block;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    color: #fff;
    text-decoration: none;
    padding: 14px 36px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    margin: 16px 0 8px 0;
  `,
  socialLink: `
    color: #71717a;
    text-decoration: none;
    font-size: 13px;
    margin: 0 8px;
  `,
};

export function wrapLayout(content: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Kenneth Kikoole</title>
    </head>
    <body style="${baseStyles.body}">
      <div style="${baseStyles.container}">
        ${content}
        <hr style="${baseStyles.divider}" />
        <div style="${baseStyles.footer}">
          <p style="margin: 0 0 12px 0;">
            <a href="https://kennethkikoole.com" style="${baseStyles.socialLink}">Portfolio</a>
            <span style="color:#3f3f46;">·</span>
            <a href="https://github.com/kikoolzs" style="${baseStyles.socialLink}">GitHub</a>
            <span style="color:#3f3f46;">·</span>
            <a href="https://linkedin.com/in/kenneth-kikoole" style="${baseStyles.socialLink}">LinkedIn</a>
          </p>
          <p style="margin:0;">Kenneth Kikoole · Nairobi, Kenya</p>
          <p style="margin:4px 0 0 0;">If you didn't sign up, you can safely ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function newsletterConfirmationEmail(email: string): string {
  return wrapLayout(`
    <div style="text-align:center;margin-bottom:8px;">
      <span style="${baseStyles.badge}">&#10003; Confirmed</span>
    </div>
    <div style="${baseStyles.card}">
      <div style="text-align:center;margin-bottom:8px;">
        <span style="font-size:48px;">&#9993;</span>
      </div>
      <h1 style="${baseStyles.heading};text-align:center;">You're on the list!</h1>
      <p style="${baseStyles.paragraph};text-align:center;">
        Welcome to the <strong style="color:#fafafa;">Techletter</strong> — short, smart reads 
        on software engineering, design, and building in public.
      </p>
      <hr style="${baseStyles.divider}" />
      <div style="${baseStyles.highlight}">
        <strong style="color:#fafafa;display:block;margin-bottom:4px;">&#128640; What to expect:</strong>
        &#8226; Weekly insights on full-stack development<br/>
        &#8226; Lessons from real-world projects<br/>
        &#8226; Tools & resources I actually use<br/>
        &#8226; No spam. Ever.
      </div>
      <p style="${baseStyles.paragraph};font-size:13px;text-align:center;">
        Sent to ${email} &mdash; you'll receive the next issue soon.
      </p>
    </div>
  `);
}

export function contactThankYouEmail(name: string, email: string): string {
  return wrapLayout(`
    <div style="text-align:center;margin-bottom:8px;">
      <span style="${baseStyles.badge}">&#9994; Received</span>
    </div>
    <div style="${baseStyles.card}">
      <div style="text-align:center;margin-bottom:8px;">
        <span style="font-size:48px;">&#128222;</span>
      </div>
      <h1 style="${baseStyles.heading};text-align:center;">Thanks, ${name}!</h1>
      <p style="${baseStyles.paragraph};text-align:center;">
        Your message has landed safely in my inbox. I review every message personally 
        and typically respond within <strong style="color:#fafafa;">24-48 hours</strong>.
      </p>
      <hr style="${baseStyles.divider}" />
      <div style="${baseStyles.highlight}">
        <strong style="color:#fafafa;display:block;margin-bottom:4px;">&#128204; Quick summary</strong>
        <span style="color:#71717a;">From:</span> ${name} (${email})<br/>
        <span style="color:#71717a;">Status:</span> Awaiting review<br/>
        <span style="color:#71717a;">Response time:</span> 24-48 hours
      </div>
      <p style="${baseStyles.paragraph};font-size:13px;text-align:center;margin-bottom:0;">
        In the meantime, feel free to browse my 
        <a href="https://kennethkikoole.com/projects" style="color:#818cf8;text-decoration:underline;">projects</a> 
        or read the latest 
        <a href="https://kennethkikoole.com/blog" style="color:#818cf8;text-decoration:underline;">blog posts</a>.
      </p>
    </div>
  `);
}

export function adminNotificationEmail(name: string, email: string, message: string): string {
  return wrapLayout(`
    <div style="${baseStyles.card}">
      <div style="margin-bottom:8px;">
        <span style="${baseStyles.badge}">&#128276; New Inquiry</span>
      </div>
      <h1 style="${baseStyles.heading}">Contact Form Submission</h1>
      <div style="${baseStyles.highlight}">
        <strong style="color:#fafafa;display:block;margin-bottom:8px;font-size:16px;">${name}</strong>
        <span style="color:#71717a;">&#9993;</span> <a href="mailto:${email}" style="color:#818cf8;">${email}</a>
      </div>
      <hr style="${baseStyles.divider}" />
      <p style="${baseStyles.paragraph};margin-bottom:8px;"><strong style="color:#fafafa;">Message:</strong></p>
      <div style="${baseStyles.highlight}">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <p style="${baseStyles.paragraph};font-size:13px;">
        Received at ${new Date().toLocaleString()}
      </p>
    </div>
  `);
}

export function newsletterAdminNotificationEmail(subscriberEmail: string): string {
  return wrapLayout(`
    <div style="${baseStyles.card}">
      <div style="margin-bottom:8px;">
        <span style="${baseStyles.badge}">&#127881; New Subscriber</span>
      </div>
      <h1 style="${baseStyles.heading}">Techletter Subscription</h1>
      <div style="${baseStyles.highlight}">
        <strong style="color:#fafafa;display:block;margin-bottom:4px;font-size:16px;">${subscriberEmail}</strong>
        <span style="color:#71717a;">Signed up on</span> ${new Date().toLocaleString()}
      </div>
    </div>
  `);
}
