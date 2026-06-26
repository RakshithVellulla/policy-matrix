from pathlib import Path

from fastapi import APIRouter, File, UploadFile

from services.pdf_service import extract_text_from_pdf

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

    previous_bytes = await previous_policy.read()
    updated_bytes = await updated_policy.read()

    previous_path.write_bytes(previous_bytes)
    updated_path.write_bytes(updated_bytes)

    previous_text = extract_text_from_pdf(str(previous_path))
    updated_text = extract_text_from_pdf(str(updated_path))

    return {
        "message": "PDFs processed successfully",
        "previous_policy": previous_policy.filename,
        "updated_policy": updated_policy.filename,
        "previous_text": previous_text,
        "updated_text": updated_text,
    }