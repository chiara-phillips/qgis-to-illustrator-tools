import sys

from loguru import logger


def configure_logger():
    """Configure Loguru logger with clean, colorful console output."""
    logger.remove()
    logger.add(
        sys.stdout,
        colorize=True,
        format=(
            "<green>{time:HH:mm:ss}</green> | "
            "<level>{level}</level> | "
            "<level>{message}</level>"
        ),
    )
