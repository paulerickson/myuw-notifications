# myuw-notifications

## Getting started

Add the following import to your page's `<head>`:

```html
<script type="module" src="https://unpkg.com/@myuw-web-components/myuw-notifications@^1?module"></script>
<script nomodule src="https://unpkg.com/@myuw-web-components/myuw-notifications@^1"></script>
```

*Note: You may want to specify a specific version of the component to ensure stability. See [the change log](CHANGELOG.md) or the [npm entry](https://www.npmjs.com/package/@myuw-web-components/myuw-notifications) for version information.*

Use the component's HTML tag wherever you want:

```HTML
<myuw-notifications
    slot="myuw-notifications"
    see-all-url="/">
    <span slot="myuw-notifications-empty">All caught up!</span>
>
</myuw-notifications>
```

### Configurable attributes

- **see-all-url**: If this optional attribute is provided, the component will display a "See all" link in the title row of the notifications list.

### Slots

- **myuw-notifications-empty**: Use this slot to insert markup you would like your users to see when there are no new notifications to view. 

### CSS Variables

WIP
