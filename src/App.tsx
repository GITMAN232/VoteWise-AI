import { UserProvider, useUser } from './context/UserContext';
import { ChatProvider } from './context/ChatContext';
import { UserSelection } from './components/Onboarding/UserSelection';
import { Chatbot } from './components/Chat/Chatbot';

function AppContent() {
  const { isSelectingProfile } = useUser();

  if (isSelectingProfile) {
    return <UserSelection />;
  }

  return <Chatbot />;
}

function App() {
  return (
    <UserProvider>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </UserProvider>
  );
}

export default App;
