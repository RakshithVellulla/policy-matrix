const API_BASE_URL = "http://127.0.0.1:8000";

export async function uploadPolicies(
  previousPolicy: File,
  updatedPolicy: File
) {
  const formData = new FormData();

  formData.append("previous_policy", previousPolicy);
  formData.append("updated_policy", updatedPolicy);

  const response = await fetch(`${API_BASE_URL}/upload/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed.");
  }

  return response.json();
}