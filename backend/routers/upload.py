from pathlib import Path

from fastapi import APIRouter, File, UploadFile

from services.pdf_service import extract_text_from_pdf
from services.compare_service import compare_policies
from services.gemini_service import generate_summary

router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_FOLDER = Path("uploads")
UPLOAD_FOLDER.mkdir(exist_ok=True)


@router.post("/")
async def upload_policies(
    previous_policy: UploadFile = File(...),
    updated_policy: UploadFile = File(...)
):
    previous_path = UPLOAD_FOLDER / previous_policy.filename
    updated_path = UPLOAD_FOLDER / updated_policy.filename

    previous_path.write_bytes(await previous_policy.read())
    updated_path.write_bytes(await updated_policy.read())

    previous_text = extract_text_from_pdf(str(previous_path))
    updated_text = extract_text_from_pdf(str(updated_path))

    differences = compare_policies(previous_text, updated_text)

    ai_summary = generate_summary(
    previous_text,
    updated_text
)
    added_count = len([d for d in differences if d["status"] == "Added"])
    removed_count = len([d for d in differences if d["status"] == "Removed"])

    return {
         "message": "Comparison completed successfully",
         "previous_policy": previous_policy.filename,
         "updated_policy": updated_policy.filename,
         "total_changes": len(differences),
         "added_count": added_count,
         "removed_count": removed_count,
         "ai_summary": ai_summary
    }