// 하루 최대 3회 말씀 알림 (매일 반복 로컬 알림)
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const MAX_ALERTS = 3;
export const TIME_PRESETS = ['06:00', '07:00', '08:00', '12:00', '18:00', '21:00'];

// times 로 알림을 새로 예약합니다. 권한이 거부되면 false.
export async function scheduleDaily(times: string[]): Promise<boolean> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  if (times.length === 0) return true;

  const perm = await Notifications.requestPermissionsAsync();
  if (!perm.granted) return false;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('daily', {
      name: '오늘의 말씀',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  for (const t of times.slice(0, MAX_ALERTS)) {
    const [hour, minute] = t.split(':').map(Number);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '오늘 성경',
        body: '오늘의 말씀이 도착했어요. 잠깐 멈추고 읽어볼까요?',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
        channelId: 'daily',
      },
    });
  }
  return true;
}
