## Purpose

Lets a single user create, track, and organize personal to-do items in a browser, with all state persisted locally so the list survives page reloads.

## ADDED Requirements

### Requirement: Add a todo item
The system SHALL allow the user to create a new todo item by providing text, and optionally a due date and a priority.

#### Scenario: Add with text only
- **WHEN** the user submits a new todo with non-empty text and no due date or priority
- **THEN** a new todo is created with that text, `done = false`, `createdAt` set to the current time, no due date, and priority defaulted to `medium`

#### Scenario: Add with due date and priority
- **WHEN** the user submits a new todo with text, a due date, and a priority
- **THEN** a new todo is created with the given text, due date, and priority, and `done = false`

#### Scenario: Reject empty text
- **WHEN** the user submits a new todo whose text is empty or only whitespace
- **THEN** the system SHALL NOT create a todo and SHALL indicate that text is required

### Requirement: Edit a todo's text
The system SHALL allow the user to edit the text of an existing todo in place.

#### Scenario: Successful edit
- **WHEN** the user edits an existing todo's text to a new non-empty value and confirms
- **THEN** the todo's text is updated and all other fields are unchanged

#### Scenario: Reject empty edit
- **WHEN** the user edits an existing todo's text to empty or only whitespace and confirms
- **THEN** the system SHALL NOT update the text and SHALL retain the previous value

### Requirement: Toggle completion state
The system SHALL allow the user to mark a todo as complete or incomplete.

#### Scenario: Mark complete
- **WHEN** the user marks an incomplete todo as done
- **THEN** the todo's `done` field becomes `true`

#### Scenario: Mark incomplete
- **WHEN** the user marks a completed todo as not done
- **THEN** the todo's `done` field becomes `false`

### Requirement: Delete a todo item
The system SHALL allow the user to permanently delete a single todo item.

#### Scenario: Delete a todo
- **WHEN** the user deletes an existing todo
- **THEN** that todo is removed from the list and no longer appears in any filtered view

### Requirement: Clear completed todos
The system SHALL allow the user to remove all completed todo items in a single action.

#### Scenario: Clear with some completed
- **WHEN** the user triggers "clear completed" and at least one todo has `done = true`
- **THEN** all todos with `done = true` are removed and all todos with `done = false` remain unchanged

#### Scenario: Clear with none completed
- **WHEN** the user triggers "clear completed" and no todo has `done = true`
- **THEN** the list is unchanged

### Requirement: Filter the visible list
The system SHALL allow the user to view All, Active (not done), or Completed (done) todos.

#### Scenario: View active only
- **WHEN** the user selects the "Active" filter
- **THEN** only todos with `done = false` are shown

#### Scenario: View completed only
- **WHEN** the user selects the "Completed" filter
- **THEN** only todos with `done = true` are shown

#### Scenario: View all
- **WHEN** the user selects the "All" filter
- **THEN** every todo is shown regardless of `done` state

### Requirement: Display order
The system SHALL display todos within the active filter in the order they were created (oldest first), and SHALL NOT reorder them based on priority or due date.

#### Scenario: New todo appears last
- **WHEN** the user adds a new todo while other todos already exist
- **THEN** the new todo appears after all existing todos in the displayed list

### Requirement: Priority as informational label
The system SHALL record and display each todo's priority (low, medium, or high) as a visible label, without using it to sort or filter the list.

#### Scenario: Priority shown but not sorted
- **WHEN** todos with different priorities exist in the same filtered view
- **THEN** each todo's priority is visibly indicated, and the display order follows creation order, not priority

### Requirement: Persist todos across reloads
The system SHALL persist all todo items to the browser's local storage such that they survive a page reload or browser restart on the same browser profile.

#### Scenario: Reload preserves data
- **WHEN** the user reloads the page after adding, editing, completing, or deleting todos
- **THEN** the list reflects the same state it had immediately before the reload

#### Scenario: First visit with no stored data
- **WHEN** the user opens the app in a browser profile with no previously stored todos
- **THEN** the system starts with an empty list rather than an error
