import notifee, { 
  AndroidImportance,
  AndroidVisibility,
  AuthorizationStatus,
  DisplayedNotification,
  InitialNotification,
  TimestampTrigger,

  TriggerType,
  Event,
  EventType,
} from '@notifee/react-native';
import { Platform } from 'react-native';
import { TripData } from '../types/trip';
import { DEFAULT_SETTINGS } from '../config';

class NotificationService {
  private static instance: NotificationService;
  private channelId: string | undefined;
  private isInitialized: boolean = false;

  private constructor() {
    this.initialize();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async initialize() {
    if (this.isInitialized) return;

    try {
      // Request permissions and create channel
      await this.requestPermissions();
      await this.createChannel();

      // Set up notification listeners
      notifee.onForegroundEvent(this.handleForegroundEvent);
      notifee.onBackgroundEvent(this.handleBackgroundEvent);

      // Get initial notification if app was opened via notification
      const initialNotification = await notifee.getInitialNotification();
      if (initialNotification) {
        this.handleInitialNotification(initialNotification);
      }

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize NotificationService:', error);
      this.isInitialized = false;
    }
  }

  private async requestPermissions(): Promise<boolean> {
    try {
      const settings = await notifee.requestPermission();
      
      if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
        console.warn('User denied notification permissions');
        return false;
      }

      if (settings.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
        console.log('Provisional notification permission granted');
      }

      return true;
    } catch (error) {
      console.error('Failed to request notification permissions:', error);
      return false;
    }
  }

  private async createChannel() {
    try {
      if (Platform.OS === 'android') {
        this.channelId = await notifee.createChannel({
          id: DEFAULT_SETTINGS.notifications.channelId || 'trip_tracking',
          name: DEFAULT_SETTINGS.notifications.channelName || 'Trip Tracking',
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
          lights: DEFAULT_SETTINGS.notifications.lights || true,
          vibration: DEFAULT_SETTINGS.notifications.vibrate || true,
          sound: DEFAULT_SETTINGS.notifications.sound ? 'default' : undefined,
        });
      }
    } catch (error) {
      console.error('Failed to create notification channel:', error);
      throw error;
    }
  }

  private handleForegroundEvent = async ({ type, detail }: Event) => {
    if (type === EventType.PRESS) {
      // Handle notification press
      switch (detail.notification?.data?.type) {
        case 'trip_started':
          // Handle trip started notification press
          break;
        case 'trip_ended':
          // Handle trip ended notification press
          break;
        case 'trip_reminder':
          // Handle trip reminder notification press
          break;
      }
    }
  };

  private handleBackgroundEvent = async ({ type, detail: _ }: Event) => {
    if (type === EventType.PRESS) {
      // Handle background notification press
      // This will be similar to foreground handling
    }
  };

  private handleInitialNotification = (notification: InitialNotification) => {
    // Handle when app is launched from notification
    const notificationType = notification.notification.data?.type;
    switch (notificationType) {
      case 'trip_started':
        // Handle trip started notification
        break;
      case 'trip_ended':
        // Handle trip ended notification
        break;
      case 'trip_reminder':
        // Handle trip reminder notification
        break;
    }
  };

  async showTripStartedNotification() {
    try {
      if (!this.isInitialized) await this.initialize();

      await notifee.displayNotification({
        title: 'Trip Started',
        body: 'Your trip is being tracked. Don\'t forget to stop tracking when you reach your destination.',
        android: {
          channelId: this.channelId || 'trip_tracking',
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'stop_tracking',
            launchActivity: 'default',
          },
        },
        ios: {
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
        },
        data: {
          type: 'trip_started',
        },
      });
    } catch (error) {
      console.error('Failed to show trip started notification:', error);
      throw error;
    }
  }

  async showTripEndedNotification(trip: Partial<TripData>) {
    try {
      if (!this.isInitialized) await this.initialize();

      await notifee.displayNotification({
        title: 'Trip Completed',
        body: `Distance: ${trip.distance?.toFixed(2)} km. Please complete trip details.`,
        android: {
          channelId: this.channelId || 'trip_tracking',
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'complete_details',
            launchActivity: 'default',
          },
        },
        ios: {
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
        },
        data: {
          type: 'trip_ended',
          tripId: trip.id || 'unknown',
        },
      });
    } catch (error) {
      console.error('Failed to show trip ended notification:', error);
      throw error;
    }
  }

  async scheduleIncompleteTripReminder() {
    try {
      if (!this.isInitialized) await this.initialize();

      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: Date.now() + DEFAULT_SETTINGS.notifications.reminderInterval,
      };

      await notifee.createTriggerNotification(
        {
          title: 'Complete Your Trip Details',
          body: 'You have an incomplete trip. Please add missing details for NATPAC research.',
          android: {
            channelId: this.channelId || 'trip_tracking',
            importance: AndroidImportance.HIGH,
          },
          ios: {
            foregroundPresentationOptions: {
              badge: true,
              sound: true,
              banner: true,
              list: true,
            },
          },
          data: {
            type: 'trip_reminder',
          },
        },
        trigger,
      );
    } catch (error) {
      console.error('Failed to schedule trip reminder:', error);
      throw error;
    }
  }

  async showMissingDetailsPrompt(missingFields: string[]) {
    try {
      if (!this.isInitialized) await this.initialize();
      if (missingFields.length === 0) return;

      await notifee.displayNotification({
        title: 'Missing Trip Information',
        body: `Please provide: ${missingFields.join(', ')}`,
        android: {
          channelId: this.channelId || 'trip_tracking',
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'complete_details',
            launchActivity: 'default',
          },
        },
        ios: {
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
        },
        data: {
          type: 'missing_details',
          fields: missingFields,
        },
      });
    } catch (error) {
      console.error('Failed to show missing details prompt:', error);
      throw error;
    }
  }

  async getDisplayedNotifications(): Promise<DisplayedNotification[]> {
    try {
      return await notifee.getDisplayedNotifications();
    } catch (error) {
      console.error('Failed to get displayed notifications:', error);
      return [];
    }
  }

  async cancelAllNotifications() {
    try {
      await notifee.cancelAllNotifications();
    } catch (error) {
      console.error('Failed to cancel notifications:', error);
      throw error;
    }
  }

  async cancelNotification(notificationId: string) {
    try {
      await notifee.cancelNotification(notificationId);
    } catch (error) {
      console.error('Failed to cancel notification:', error);
      throw error;
    }
  }
}

export default NotificationService;