# Push Notifications Guide

This guide explains how to structure notification payloads for different types of notifications in the app.

## Structure

All notifications should follow this basic structure:

```json
{
  "title": "Notification Title",
  "body": "Notification message",
  "data": {
    "routeKey": "ROUTE.KEY",
    "params": {
      "id": "optional-parameter"
    }
  }
}
```

## Available Routes

### Promotions
```json
{
  "title": "Summer Sale!",
  "body": "Get 50% off on all items",
  "data": {
    "routeKey": "PROMOTIONS.LIST"
  }
}

// For specific promotion
{
  "title": "Flash Sale!",
  "body": "Limited time offer on selected items",
  "data": {
    "routeKey": "PROMOTIONS.DETAILS",
    "params": {
      "id": "flash-sale-123"
    }
  }
}
```

### Orders
```json
{
  "title": "Order Update",
  "body": "Your order #123 is ready for pickup",
  "data": {
    "routeKey": "ORDERS.DETAILS",
    "params": {
      "id": "order-123"
    }
  }
}
```

### Settings
```json
{
  "title": "App Update",
  "body": "New features available!",
  "data": {
    "routeKey": "SETTINGS.MAIN"
  }
}
```

## Best Practices

1. **Keep Titles Short**
   - Maximum 40 characters
   - Clear and actionable

2. **Body Text**
   - Maximum 120 characters
   - Include key information
   - Use action words

3. **Route Keys**
   - Always use predefined route keys
   - Don't use direct screen paths
   - Include required parameters

4. **Parameters**
   - Only include necessary data
   - Use consistent ID formats
   - Keep parameter names simple

## Examples by Use Case

### Promotional Messages
```json
{
  "title": "Weekend Special",
  "body": "Free delivery on orders above $30",
  "data": {
    "routeKey": "PROMOTIONS.DETAILS",
    "params": {
      "id": "weekend-special"
    }
  }
}
```

### Order Updates
```json
{
  "title": "Order Status",
  "body": "Your order is out for delivery",
  "data": {
    "routeKey": "ORDERS.DETAILS",
    "params": {
      "id": "order-456"
    }
  }
}
```

### System Notifications
```json
{
  "title": "App Maintenance",
  "body": "Scheduled maintenance in 2 hours",
  "data": {
    "routeKey": "TABS.HOME"
  }
}
```

## Testing

Before sending to production:
1. Test on development environment
2. Verify navigation works correctly
3. Check parameter handling
4. Ensure proper error handling

## Support

For any questions or issues:
1. Check this documentation
2. Contact the mobile team
3. Use the development environment for testing 