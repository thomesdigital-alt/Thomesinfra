interface EmailFormData {
  name: string;
  phone: string;
  project: string;
  message: string;
}

export const sendEmail = async (formData: EmailFormData) => {
  try {
    const response = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        project: formData.project,
        message: formData.message,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || "Failed to send email.");
    }

    return result;

  } catch (error) {
    console.error("Send Email Error:", error);
    throw error;
  }
};