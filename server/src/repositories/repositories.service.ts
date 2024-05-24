import { Injectable } from "@nestjs/common";
import { Octokit } from "@octokit/rest";
import { UsersService } from "src/users/users.service";

@Injectable()
export class RepositoriesService {
  private octokit: Octokit;

  constructor(private user: UsersService) { }

  
  async getRepositoryContent(id: string , username: string) {
    const user_token = await this.user.getUserToken(username);
  
    this.octokit = new Octokit({ auth: user_token });
  
    try {
      const repository = await this.octokit.request('GET /repositories/:id', {id})
      const repo = repository.data.name;
      const owner = repository.data.owner.login;
  
      const tree_sha = await this.getTreeSha(owner, repo, 'master');
  
      const { data } = await this.octokit.git.getTree({
        owner,
        repo,
        tree_sha,
        recursive: '1'
      });
  
      const files = data.tree.filter(item => item.type === 'blob');
  
      const fileContents = await Promise.all(files.map(async (file) => {
        const content = await this.getFileContent(owner, repo, file.sha);
        return { path: file.path, content };
      }));
  
      return {
        id: repository.data.id,
        tree_sha,
        name: repo,
        owner,
        content: fileContents
      };
  
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  


  async getTreeSha(owner: string, repo: string, branch: string) {
    const { data } = await this.octokit.repos.getBranch({
      owner,
      repo,
      branch
    });

    const lastCommitSha = data.commit.sha;

    const commit = await this.octokit.git.getCommit({
      owner,
      repo,
      commit_sha: lastCommitSha
    });

    return commit.data.tree.sha;
  }

  private async getFileContent(owner: string, repo: string, file_sha: string) {
    const { data } = await this.octokit.git.getBlob({
      owner,
      repo,
      file_sha
    });

    return Buffer.from(data.content, 'base64').toString('utf-8');
  }

  async getMultipleReposContent(repos: string[], username: string) {
    for (const repo of repos) {
      await this.getRepositoryContent(repo, username);
    }
  }

}