import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  loadingContainer: ViewStyle;
  loadingText: TextStyle;
  scrollContent: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  distance: TextStyle;
  trackingContainer: ViewStyle;
  button: ViewStyle;
  startButton: ViewStyle;
  stopButton: ViewStyle;
  buttonText: TextStyle;
  saveButton: ViewStyle;
  formContainer: ViewStyle;
  sectionTitle: TextStyle;
  inputContainer: ViewStyle;
  label: TextStyle;
  input: ViewStyle & TextStyle;
  inputError: ViewStyle;
  errorText: TextStyle;
  modesContainer: ViewStyle;
  modeButton: ViewStyle;
  selectedMode: ViewStyle;
  modeText: TextStyle;
  selectedModeText: TextStyle;
  purposeContainer: ViewStyle;
  purposeButton: ViewStyle;
  selectedPurpose: ViewStyle;
  purposeText: TextStyle;
  selectedPurposeText: TextStyle;
  frequencyContainer: ViewStyle;
  frequencyButton: ViewStyle;
  selectedFrequency: ViewStyle;
  frequencyText: TextStyle;
  selectedFrequencyText: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#a3e4fbff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  distance: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
  },
  trackingContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20, // Updated for consistency
    minWidth: 200,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    marginTop: 24,
    marginBottom: 32,
  },
  formContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  inputError: {
    borderColor: '#F44336',
    borderWidth: 1,
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 4,
  },
  modesContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  modeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedMode: {
    backgroundColor: '#2196F3',
  },
  modeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedModeText: {
    color: '#FFF',
  },
  purposeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  purposeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    margin: 4,
  },
  selectedPurpose: {
    backgroundColor: '#2196F3',
  },
  purposeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedPurposeText: {
    color: '#FFF',
  },
  frequencyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  frequencyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    margin: 4,
    marginBottom: 8,
  },
  selectedFrequency: {
    backgroundColor: '#2196F3',
  },
  frequencyText: {
    fontSize: 14,
    color: '#333',
  },
  selectedFrequencyText: {
    color: '#FFF',
  },
});