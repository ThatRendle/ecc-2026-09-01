## Purpose

Lets a single user capture, organize, and track personal todo items — from
creation through completion or removal — with the item persisting across
restarts.

## ADDED Requirements

### Requirement: Create todo item
The system SHALL allow the user to create a new todo item with a required text
description. All other fields (due date, priority, tags, notes) are optional at
creation time.

#### Scenario: Create item with text only
- **WHEN** the user creates a new item providing only text
- **THEN** the item is added to the list, incomplete, with no due date, no
  priority set, no tags, and no notes

#### Scenario: Create item with all fields
- **WHEN** the user creates a new item providing text, a due date, a priority,
  one or more tags, and notes
- **THEN** the item is added to the list with all provided values stored

### Requirement: Edit todo item
The system SHALL allow the user to edit any field of an existing todo item —
text, due date, priority, tags, or notes — at any time after creation.

#### Scenario: Edit item text
- **WHEN** the user changes the text of an existing item
- **THEN** the item reflects the new text and retains its other fields
  unchanged

#### Scenario: Edit item due date, priority, tags, or notes
- **WHEN** the user changes the due date, priority, tags, or notes of an
  existing item
- **THEN** the item reflects the updated value(s) for the changed field(s)

### Requirement: Complete and uncomplete todo item
The system SHALL allow the user to mark an incomplete item as done, and to
revert a done item back to incomplete.

#### Scenario: Mark item done
- **WHEN** the user marks an incomplete item as done
- **THEN** the item's status becomes done

#### Scenario: Revert item to incomplete
- **WHEN** the user unmarks a done item
- **THEN** the item's status becomes incomplete

### Requirement: Delete todo item with confirmation
The system SHALL require the user to confirm a delete action before a todo
item is permanently removed.

#### Scenario: Confirm deletion
- **WHEN** the user requests to delete an item and confirms the deletion
- **THEN** the item is permanently removed from the list

#### Scenario: Cancel deletion
- **WHEN** the user requests to delete an item and does not confirm (cancels)
- **THEN** the item remains unchanged in the list

### Requirement: Priority levels
The system SHALL allow each todo item to have a priority of Low, Medium, or
High, or no priority set.

#### Scenario: Set priority
- **WHEN** the user sets an item's priority to Low, Medium, or High
- **THEN** the item stores that priority value

#### Scenario: No priority set
- **WHEN** an item is created without a priority
- **THEN** the item has no priority value until the user sets one

### Requirement: Tags with autocomplete
The system SHALL allow the user to attach zero or more free-form tags to a
todo item, and SHALL suggest previously used tags as the user types a tag.

#### Scenario: Add a new tag
- **WHEN** the user types a tag name that has not been used before and applies
  it to an item
- **THEN** the item is tagged with that name, and the name becomes available
  as a suggestion for future tagging

#### Scenario: Reuse an existing tag via autocomplete
- **WHEN** the user starts typing a tag name that matches a tag already used
  on another item
- **THEN** the system suggests that existing tag name for selection

### Requirement: Overdue items are visually distinct
The system SHALL visually distinguish an incomplete todo item whose due date
is in the past from other items in the list.

#### Scenario: Incomplete item past due date
- **WHEN** an incomplete item's due date is earlier than the current date
- **THEN** the item is displayed as overdue, distinct from non-overdue items

#### Scenario: Completed item past due date is not flagged overdue
- **WHEN** a done item's due date is earlier than the current date
- **THEN** the item is not displayed as overdue

### Requirement: Filter todo list
The system SHALL allow the user to filter the todo list by completion status,
tag, and priority.

#### Scenario: Filter by status
- **WHEN** the user filters the list to show only incomplete (or only done)
  items
- **THEN** only items matching that status are shown

#### Scenario: Filter by tag
- **WHEN** the user filters the list by a specific tag
- **THEN** only items carrying that tag are shown

#### Scenario: Filter by priority
- **WHEN** the user filters the list by a specific priority level
- **THEN** only items with that priority are shown

### Requirement: Sort todo list
The system SHALL allow the user to sort the todo list by due date and by
priority.

#### Scenario: Sort by due date
- **WHEN** the user sorts the list by due date
- **THEN** items are ordered by due date, with items lacking a due date
  grouped consistently (e.g. last)

#### Scenario: Sort by priority
- **WHEN** the user sorts the list by priority
- **THEN** items are ordered from highest to lowest priority, with
  unprioritized items grouped consistently

### Requirement: Persistence across restarts
The system SHALL retain all todo items, with their full field values, across
an application restart, for the single user on the single device where the
data was created.

#### Scenario: Items survive a restart
- **WHEN** the user closes and reopens the application
- **THEN** every previously created item is present with all its field values
  intact

### Requirement: Single-user scope
The system SHALL operate for a single user on a single device, with no user
accounts, authentication, or multi-device synchronization.

#### Scenario: No login required
- **WHEN** the user opens the application
- **THEN** the user's todo list is shown directly, with no sign-in step
