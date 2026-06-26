from fastapi import APIRouter, UploadFile, File

router = APIRouter(prefix="/upload", tags=["Upload"])


@router.post("/")
async def upload_policies(
    previous_policy: UploadFile = File(...),
    updated_policy: UploadFile = File(...)
):
    return {
        "message": "2 files received successfully",
        "previous_policy": previous_policy.filename,
        "updated_policy": updated_policy.filename
    }