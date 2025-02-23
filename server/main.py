import json
import re
from datetime import datetime
from contextlib import asynccontextmanager
from enum import Enum
from typing import Optional, List

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

# SIMPLE store of data for this exercise
DATA = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    with open('seed_data/contributions.json') as f:
        DATA['contribution_data'] = json.load(f)['contributions']
    yield
    DATA.clear()

app = FastAPI(lifespan=lifespan)

# Add CORS middleware to allow requests from the React app
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def root():
    return {"message": "Arqiva Tech Test 1 - Good Luck!"}


class ContributionOrder(str, Enum):
    id = "id"
    title = "title"
    description = "description"
    startTime = "startTime"
    endTime = "endTime"
    owner = "owner"


class MatchType(str, Enum):
    any = "any"
    all = "all"


class ContributionFilter(str, Enum):
    id: Optional[str]  # equals
    title: Optional[str]  # contains
    description: Optional[str]  # contains
    startBefore: Optional[str]
    startAfter: Optional[str]
    endBefore: Optional[str]
    endAfter: Optional[str]
    owner: Optional[str]  # equals
    match: Optional[MatchType]


def _ids(l: list):
    return [i['id'] for i in l]


def parse_datetime(date_str: str):
    """Utility function to parse a datetime string into a datetime object."""
    try:
        return datetime.fromisoformat(date_str.replace("Z", "+00:00"))
    except ValueError:
        return None


@app.get("/contributions/")
async def list_contributions(skip: int = 0, limit: int = 30,
                             order_by: ContributionOrder = Query(default=ContributionOrder.id),
                             id: Optional[List[str]] = Query(None),
                             owner: Optional[str] = Query(None),
                             title: Optional[str] = Query(None),
                             description: Optional[str] = Query(None),
                             startBefore: Optional[str] = Query(None),
                             startAfter: Optional[str] = Query(None),
                             endBefore: Optional[str] = Query(None),
                             endAfter: Optional[str] = Query(None),
                             match: MatchType = Query(default=MatchType.all),
                             searchQuery: Optional[str] = Query(None),  # Added search query
                             ):
    contributions: list = DATA['contribution_data']
    
    # Debugging: Print the search query received
    print(f"Received searchQuery: {searchQuery}")
    
    # Apply search query filter for title, description, or owner if provided
    if searchQuery:
        searchQuery = searchQuery.lower()  # Convert to lowercase for case-insensitive matching
        print(f"Filtering contributions with search query: {searchQuery}")
        contributions = [c for c in contributions if (
            searchQuery in c['title'].lower() or
            searchQuery in c['description'].lower() or
            searchQuery in c['owner'].lower()
        )]
        print(f"Filtered contributions: {contributions}")

    # Filter logic setup for other filters (e.g., id, owner, etc.)
    all_ids = [] if match == MatchType.any else _ids(contributions)
    matching_ids = all_ids
    matching_title = all_ids
    matching_description = all_ids
    matching_owner = all_ids
    matching_start_before = all_ids
    matching_start_after = all_ids
    matching_end_before = all_ids
    matching_end_after = all_ids

    if id:
        matching_ids = _ids([c for c in contributions if c['id'] in id])
        print("Matching IDs:", matching_ids)

    if title:
        matching_title = _ids([c for c in contributions if re.search(title, c['title'], re.IGNORECASE)])
        print("Matching Titles:", matching_title)

    if description:
        matching_description = _ids([c for c in contributions if re.search(description, c['description'], re.IGNORECASE)])
        print("Matching Descriptions:", matching_description)

    if owner:
        matching_owner = _ids([c for c in contributions if re.search(owner, c['owner'], re.IGNORECASE)])
        print("Matching Owners:", matching_owner)

    if startBefore:
        startBefore_dt = parse_datetime(startBefore)
        matching_start_before = _ids([c for c in contributions if parse_datetime(c['startTime']) < startBefore_dt])
        print("Matching Start Before:", matching_start_before)

    if startAfter:
        startAfter_dt = parse_datetime(startAfter)
        matching_start_after = _ids([c for c in contributions if parse_datetime(c['startTime']) > startAfter_dt])
        print("Matching Start After:", matching_start_after)

    if endBefore:
        endBefore_dt = parse_datetime(endBefore)
        matching_end_before = _ids([c for c in contributions if parse_datetime(c['endTime']) < endBefore_dt])
        print("Matching End Before:", matching_end_before)

    if endAfter:
        endAfter_dt = parse_datetime(endAfter)
        matching_end_after = _ids([c for c in contributions if parse_datetime(c['endTime']) > endAfter_dt])
        print("Matching End After:", matching_end_after)

    # Combine all filters based on match type
    matching_contribution_ids = []
    if match == MatchType.any:
        matching_contribution_ids = set(matching_ids + matching_title + matching_description +
                                        matching_start_before + matching_start_after + matching_end_before +
                                        matching_end_after + matching_owner)
    else:  # all
        matching_contribution_ids = list(set(matching_ids) & set(matching_title) & set(matching_description) &
                                          set(matching_start_before) & set(matching_start_after) & 
                                          set(matching_end_before) & set(matching_end_after) & set(matching_owner))

    matching_contributions = [c for c in contributions if c['id'] in matching_contribution_ids]

    # Sorting by the specified order
    if order_by:
        matching_contributions = sorted(matching_contributions, key=lambda contribution: contribution[order_by])

    # Pagination
    paginated_contributions = matching_contributions[skip:skip + limit]

    return {
        "contributions": paginated_contributions,
        "total": len(matching_contributions),
        "skip": skip,
        "limit": limit
    }
