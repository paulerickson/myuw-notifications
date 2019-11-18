# myuw-notifications versions

## 1.2.0

### Added
- Optional attribute to set a limit on the number of notifications displayed in the list
- Enable scrolling if many notifications
- Delivery pipeline
- Contributing guidelines

## 1.1.0

### Added
- Demo page now includes adding new notifications via a simple form
- Individual notifications are now handled by a child component to more clearly separate functionality and markup/styles, and to simplify DOM manipulation
- Documentation for hooking into notification dismissal event
- Broader support for existing MyUW notification data model (moreInfoButton, confirmButton)
- Parent component (myuw-notifications) keeps track of unique notification IDs

### Fixed
- No duplicate notifications
- Stop observing attributes that can't or won't ever change
- Changed IDs for demo notifications to strings to reflect the expectations of the data model

## 1.0.0

Initial release
