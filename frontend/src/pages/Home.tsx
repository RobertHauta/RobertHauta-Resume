import { Container, Title, Text, Button, Stack, Paper } from '@mantine/core';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Container size="md" my={40}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Stack>
          <Title>Welcome to Resume Website</Title>

          {isAuthenticated ? (
            <>
              <Text size="lg">
                Hello, {user?.full_name || user?.email}!
              </Text>
              <Text c="dimmed">
                Email: {user?.email}
              </Text>
              <Text c="dimmed">
                Account created: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </Text>
              <Button onClick={logout} color="red" mt="md">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Text>
                Please login or register to continue.
              </Text>
              <Stack>
                <Button onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/register')} variant="outline">
                  Register
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};