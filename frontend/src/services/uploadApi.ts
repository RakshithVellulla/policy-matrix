const API_BASE_URL = "http://127.0.0.1:8000";

export async function uploadPolicies(
  previousPolicy: File,
  updatedPolicy: File
) {
  const formData = new FormData();

  formData.append("previous_policy", previousPolicy);
  formData.append("updated_policy", updatedPolicy);

  try {
    const response = await fetch(`${API_BASE_URL}/upload/`, {
      method: "POST",
      body: formData,
    });

    const text = await response.text();
    console.log("Response:", text);

    if (!response.ok) {
      throw new Error(text);
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}