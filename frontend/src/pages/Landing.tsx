import { useState, useEffect } from 'react';
import { Container, Title, Text, Grid, Center, Loader, Stack } from '@mantine/core';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import type { Project } from '../types/project';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export function Landing() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get<Project[]>(`${API_URL}/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpened(true);
  };

  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="xl" color="red" />
      </Center>
    );
  }

  return (
    <>
      <Container size="xl" py="xl">
        <Stack gap="xl" mb="xl">
          <div>
            <Title order={1} size="3rem" ta="center" c="white">
              Robert Hauta
            </Title>
            <Text size="xl" ta="center" c="dimmed" mt="md">
              Full Stack Developer & Software Engineer
            </Text>
          </div>

          <Text size="lg" ta="center" c="white" maw={800} mx="auto">
            Welcome to my portfolio. Here you'll find a collection of projects I've worked on,
            showcasing my expertise in full-stack development, cloud architecture, and modern web technologies.
          </Text>
        </Stack>

        {projects.length === 0 ? (
          <Center py="xl">
            <Text size="lg" c="dimmed">
              No projects yet. Check back soon!
            </Text>
          </Center>
        ) : (
          <Grid gutter="lg">
            {projects.map((project) => (
              <Grid.Col key={project.id} span={{ base: 12, sm: 6, md: 4 }}>
                <ProjectCard
                  project={project}
                  onClick={() => handleProjectClick(project)}
                />
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Container>

      <ProjectModal
        project={selectedProject}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
}