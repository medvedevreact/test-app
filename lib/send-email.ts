import { Resend } from "resend";

export const sendEmail = async (
  to: string,
  subject: string,
  template: React.ReactNode
) => {
  const resend = new Resend("re_NuGnvtgH_3k6Spi997u7q481hdhK5iXtB");

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    text: "",
    react: template,
  });

  console.log(data);

  if (error) {
    throw error;
  }

  return data;
};
