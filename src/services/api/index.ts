import { db } from '../db';
import { Project } from '../../types';

// Project API
export async function createProject(userId: string, name: string): Promise<Project> {
  const projectId = crypto.randomUUID();
  
  await db`
    INSERT INTO projects (id, user_id, name)
    VALUES (${projectId}, ${userId}, ${name})
  `;

  return {
    id: projectId,
    name,
    files: {}
  };
}

export async function getProjects(userId: string): Promise<Project[]> {
  const projects = await db`
    SELECT p.*, f.path, f.content
    FROM projects p
    LEFT JOIN files f ON f.project_id = p.id
    WHERE p.user_id = ${userId}
    ORDER BY p.updated_at DESC
  `;

  // Group files by project
  const projectMap = new Map<string, Project>();
  
  projects.forEach((row: any) => {
    if (!projectMap.has(row.id)) {
      projectMap.set(row.id, {
        id: row.id,
        name: row.name,
        files: {}
      });
    }

    if (row.path && row.content) {
      const project = projectMap.get(row.id)!;
      project.files[row.path] = row.content;
    }
  });

  return Array.from(projectMap.values());
}

export async function updateProject(projectId: string, updates: Partial<Project>): Promise<void> {
  await db`
    UPDATE projects
    SET name = ${updates.name}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${projectId}
  `;

  if (updates.files) {
    // Update files
    for (const [path, content] of Object.entries(updates.files)) {
      await db`
        INSERT INTO files (id, project_id, path, content)
        VALUES (${crypto.randomUUID()}, ${projectId}, ${path}, ${content})
        ON CONFLICT (project_id, path)
        DO UPDATE SET content = ${content}, updated_at = CURRENT_TIMESTAMP
      `;
    }
  }
}

export async function deleteProject(projectId: string): Promise<void> {
  await db`
    DELETE FROM files WHERE project_id = ${projectId}
  `;
  
  await db`
    DELETE FROM projects WHERE id = ${projectId}
  `;
}