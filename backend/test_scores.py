import asyncio
from services.score_service import score_service

async def run():
    try:
        res = await score_service.get_user_scores("MolSx90MFLZjjOjo9iqqAZP9ImO2")
        print("Success:", res)
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(run())
