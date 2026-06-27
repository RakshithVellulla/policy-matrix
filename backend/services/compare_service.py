import re

IGNORE_PATTERNS = [
    r"^Page \d+",
    r"^UnitedHealthcare",
    r"^Reimbursement Policy Update Bulletin",
]


def should_ignore(line: str) -> bool:
    line = line.strip()

    if len(line) < 4:
        return True

    for pattern in IGNORE_PATTERNS:
        if re.search(pattern, line, re.IGNORECASE):
            return True

    return False


def clean_lines(text: str):
    lines = []

    for line in text.splitlines():
        line = line.strip()

        if not line:
            continue

        if should_ignore(line):
            continue

        lines.append(line)

    return lines


def compare_policies(previous_text: str, updated_text: str):
    previous_lines = clean_lines(previous_text)
    updated_lines = clean_lines(updated_text)

    differences = []

    for line in updated_lines:
        if line not in previous_lines:
            differences.append({
                "status": "Added",
                "text": line
            })

    for line in previous_lines:
        if line not in updated_lines:
            differences.append({
                "status": "Removed",
                "text": line
            })

    return differences