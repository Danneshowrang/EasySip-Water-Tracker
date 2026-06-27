import { View, Text, StyleSheet, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';

const Tab = createBottomTabNavigator();

function HomeScreen({ totalConsumed, dailyGoal }) {
  const percentage = Math.round((totalConsumed / dailyGoal) * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.amount}>{totalConsumed} ml</Text>
      <Text style={styles.goal}>Goal: {dailyGoal} ml</Text>
      <Text style={styles.percentage}>{percentage}% complete</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

function HistoryScreen() {
  const [expanded, setExpanded] = useState(null);

  const history = [
    { date: 'Jun 25', amount: 1800, events: ['50ml consumed', 'Cup refilled', '100ml consumed', 'Cup replaced', '200ml consumed'] },
    { date: 'Jun 24', amount: 2100, events: ['150ml consumed', 'Cup refilled', '300ml consumed'] },
    { date: 'Jun 23', amount: 950, events: ['100ml consumed', 'Cup replaced', '50ml consumed'] },
  ];

  return (
    <View style={styles.container}>  
      <Text style={styles.title}>History</Text>
      {history.map((day) => (
        <View key={day.date} style={{ width: '80%', alignSelf: 'center' }}
>
          <View style={styles.historyRow} onStartShouldSetResponder={() => { setExpanded(expanded === day.date ? null : day.date); return true; }}>
            <Text style={styles.historyDate}>{day.date}</Text>
            <Text style={[styles.historyAmount, { color: day.amount >= 2000 ? 'green' : 'red' }]}>{day.amount} ml</Text>
          </View>
          {expanded === day.date && day.events.map((event, i) => (
            <Text key={i} style={styles.eventItem}>• {event}</Text>
          ))}
        </View>
      ))}
    </View>
  );
}

function SettingsScreen({ dailyGoal, setDailyGoal }) {
  const [reminderInterval, setReminderInterval] = useState('30');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Daily Goal (ml)</Text>
        <TextInput
          style={styles.settingInput}
          value={dailyGoal}
          onChangeText={setDailyGoal}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Reminder every (min)</Text>
        <TextInput
          style={styles.settingInput}
          value={reminderInterval}
          onChangeText={setReminderInterval}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Device</Text>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>Not connected</Text>
      </View>
    </View>
  );
}

export default function App() {
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [totalConsumed, setTotalConsumed] = useState(0);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" children={() => <HomeScreen totalConsumed={totalConsumed} dailyGoal={dailyGoal} />} />
        <Tab.Screen name="Settings" children={() => <SettingsScreen dailyGoal={dailyGoal} setDailyGoal={setDailyGoal} />} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  amount: { fontSize: 64, fontWeight: 'bold', color: '#00aaff' },
  goal: { fontSize: 18, color: '#888', marginTop: 10 },
  percentage: { fontSize: 24, marginTop: 10 },
  progressBar: { width: '80%', height: 12, backgroundColor: '#e0e0e0', borderRadius: 6, marginTop: 20 },
  progressFill: { height: 12, backgroundColor: '#00aaff', borderRadius: 6 },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  historyDate: { fontSize: 16, color: '#333' },
  historyAmount: { fontSize: 16, fontWeight: 'bold' },
  eventItem: { fontSize: 14, color: '#555', paddingVertical: 4, paddingLeft: 8 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  settingLabel: { fontSize: 16, color: '#333' },
  settingInput: { fontSize: 16, color: '#00aaff', fontWeight: 'bold', textAlign: 'right', minWidth: 60 }, 
});