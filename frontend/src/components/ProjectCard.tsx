import { Card, Image, Text, Group, Badge, Stack } from '@mantine/core';
import type { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      withBorder
      style={{ cursor: 'pointer', height: '100%' }}
      onClick={onClick}
    >
      <Card.Section>
        {project.images[0] ? (
          <Image
            src={project.images[0]}
            height={200}
            alt={project.title}
            fallbackSrc="https://placehold.co/600x400/1A1B1E/white?text=No+Image"
          />
        ) : (
          <div style={{ height: 200, backgroundColor: '#1A1B1E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text c="dimmed">No Preview</Text>
          </div>
        )}
      </Card.Section>

      <Stack mt="md" gap="md">
        <Text fw={700} size="xl">
          {project.title}
        </Text>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {project.brief_description}
        </Text>

        <Group gap="xs">
          {project.technology_icons.slice(0, 5).map((icon, index) => (
            <Image
              key={index}
              src={icon}
              h={32}
              w={32}
              alt={project.technologies[index]}
              title={project.technologies[index]}
              fallbackSrc="https://placehold.co/32x32/25262b/white?text=?"
            />
          ))}
          {project.technology_icons.length > 5 && (
            <Badge variant="light" color="gray">
              +{project.technology_icons.length - 5}
            </Badge>
          )}
        </Group>
      </Stack>
    </Card>
  );
}