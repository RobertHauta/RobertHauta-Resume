import { Modal, Image, Text, Group, Stack, Button } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconBrandGithub, IconWorld } from '@tabler/icons-react';
import type { Project } from '../types/project';

interface ProjectModalProps {
  project: Project | null;
  opened: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, opened, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text size="xl" fw={700}>{project.title}</Text>}
      size="xl"
      padding="lg"
      centered
      overlayProps={{ blur: 3, opacity: 0.5 }}
      styles={{
        content: {
          maxHeight: '90vh',
        },
        body: {
          maxHeight: '75vh',
          overflowY: 'auto',
        },
      }}
    >
      <Stack gap="lg">
        {/* Image Gallery */}
        {project.images.length > 0 && (
          <Carousel withIndicators height={400}>
            {project.images.map((image, index) => (
              <Carousel.Slide key={index}>
                <Image
                  src={image}
                  height={400}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fit="contain"
                  fallbackSrc="https://placehold.co/800x400/1A1B1E/white?text=No+Image"
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        )}

        {/* Full Description */}
        <div>
          <Text size="sm" fw={600} mb="xs">Description</Text>
          <Text size="sm">{project.full_description}</Text>
        </div>

        {/* Technologies */}
        <div>
          <Text size="sm" fw={600} mb="xs">Technologies Used</Text>
          <Group gap="md">
            {project.technology_icons.map((icon, index) => (
              <Stack key={index} gap={4} align="center">
                <Image
                  src={icon}
                  h={48}
                  w={48}
                  alt={project.technologies[index]}
                  fallbackSrc="https://placehold.co/48x48/25262b/white?text=?"
                />
                <Text size="xs" c="dimmed">{project.technologies[index]}</Text>
              </Stack>
            ))}
          </Group>
        </div>

        {/* What I Learned */}
        {project.learned && (
          <div>
            <Text size="sm" fw={600} mb="xs">What I Learned</Text>
            <Text size="sm">{project.learned}</Text>
          </div>
        )}

        {/* Links */}
        <Group gap="md">
          {project.github_url && (
            <Button
              component="a"
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              leftSection={<IconBrandGithub size={20} />}
              variant="light"
            >
              View Code
            </Button>
          )}
          {project.live_url && (
            <Button
              component="a"
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              leftSection={<IconWorld size={20} />}
              variant="light"
            >
              Live Demo
            </Button>
          )}
        </Group>
      </Stack>
    </Modal>
  );
}