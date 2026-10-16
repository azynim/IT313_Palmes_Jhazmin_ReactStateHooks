
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// Custom hook for the stopwatch
function useStopwatch(isRunning: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds(currentSeconds => currentSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return seconds;
}

// Practice tracker component
type PracticeTrackerProps = {
  solved: number;
  onSolve: () => void;
  onReset: () => void;
};

function PracticeTracker({
  solved,
  onSolve,
  onReset,
}: PracticeTrackerProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Practice Problems</Text>

      <Text style={styles.counter}>
        Solved: {solved}
      </Text>

      {solved >= 5 && (
        <Text style={styles.successMessage}>
          Great job!
        </Text>
      )}

      <Pressable
        style={styles.primaryButton}
        onPress={onSolve}
      >
        <Text style={styles.buttonText}>Solve +1</Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={onReset}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </Pressable>
    </View>
  );
}

// Stopwatch component
type StopwatchProps = {
  isRunning: boolean;
  seconds: number;
};

function Stopwatch({ seconds, isRunning }: StopwatchProps) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime =
    `${String(minutes).padStart(2, '0')}:` +
    `${String(remainingSeconds).padStart(2, '0')}`;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Lab Stopwatch</Text>

      <Text style={styles.timerText}>{formattedTime}</Text>

      <Text style={styles.statusText}>
        {isRunning ? 'Running…' : 'Paused'}
      </Text>
    </View>
  );
}

// Main screen
function LabScreen() {
  const [solved, setSolved] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const seconds = useStopwatch(isRunning);

  const handleSolve = () => {
    setSolved(s => s + 1);
  };

  const handleReset = () => {
    setSolved(0);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>Lab Practice Tracker</Text>

      <Text style={styles.subtitle}>
        Keep track of your practice and study time.
      </Text>

      <PracticeTracker
        solved={solved}
        onSolve={handleSolve}
        onReset={handleReset}
      />

      <Stopwatch
        seconds={seconds}
        isRunning={isRunning}
      />

      <View style={styles.buttonRow}>
        <Pressable
          style={styles.startButton}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>Start</Text>
        </Pressable>

        <Pressable
          style={styles.stopButton}
          onPress={handleStop}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f6fb',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#1D3557',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#667085',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#344054',
    marginBottom: 12,
  },
  counter: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 17,
    color: '#16803D',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  timerText: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#1D3557',
    textAlign: 'center',
    marginVertical: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#667085',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryButton: {
    backgroundColor: '#667085',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  startButton: {
    flex: 1,
    backgroundColor: '#16803D',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  stopButton: {
    flex: 1,
    backgroundColor: '#DC2626',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default function App() {
  return <LabScreen />;
}

