import simpleGit, { SimpleGit, Options } from 'simple-git';
import { ResponseModel } from './helpers';

export class Git {
  private git: SimpleGit;

  constructor(repoPath: string, options?: Options) {
    this.git = simpleGit(repoPath, options);
  }

  async clone(repoUrl: string, clonePath: string): Promise<ResponseModel> {
    try {
      await this.git.clone(repoUrl, clonePath);
      console.log(`Repository cloned from ${repoUrl} to ${clonePath}`);
      return { success: true, message: 'Repository cloned successfully' };
    } catch (error) {
      console.error('Error cloning repository: ', error);
      return {
        success: false,
        message: 'Error cloning repository',
        data: error,
      };
    }
  }

  async pull(): Promise<ResponseModel> {
    try {
      await this.git.pull();
      console.log('Repository successfully pulled');
      return { success: true, message: 'Repository pulled successfully' };
    } catch (error) {
      console.error('Error pulling changes: ', error);
      return { success: false, message: 'Error pulling changes', data: error };
    }
  }

  async commit(message: string, files: string[]): Promise<ResponseModel> {
    try {
      await this.git.add(files).commit(message);
      console.log(`Changes committed with message: ${message}`);
      return {
        success: true,
        message: `Changes committed with message: ${message}`,
      };
    } catch (error) {
      console.error('Error committing changes: ', error);
      return {
        success: false,
        message: 'Error committing changes',
        data: error,
      };
    }
  }

  async push(): Promise<ResponseModel> {
    try {
      await this.git.push();
      console.log('Changes successfully pushed');
      return { success: true, message: 'Changes pushed successfully' };
    } catch (error) {
      console.error('Error pushing changes: ', error);
      return { success: false, message: 'Error pushing changes', data: error };
    }
  }

  async merge(
    branchName: string,
    mergeBranchName: string,
  ): Promise<ResponseModel> {
    try {
      await this.git.mergeFromTo(mergeBranchName, branchName);
      console.log(`Changes merged from branch ${branchName}`);
      return { success: true, message: 'Changes merged successfully' };
    } catch (error) {
      console.error('Error merging changes: ', error);
      return { success: false, message: 'Error merging changes', data: error };
    }
  }

  async createBranch(branchName: string): Promise<ResponseModel> {
    try {
      await this.git.checkoutBranch(branchName, 'HEAD');
      console.log(`New branch '${branchName}' created`);
      return { success: true, message: 'Branch created successfully' };
    } catch (error) {
      console.error('Error creating branch: ', error);
      return { success: false, message: 'Error creating branch', data: error };
    }
  }

  async checkout(branchName: string): Promise<ResponseModel> {
    try {
      await this.git.checkout(branchName);
      console.log(`Switched to branch '${branchName}'`);
      return { success: true, message: 'Branch switched successfully' };
    } catch (error) {
      console.error('Error checking out branch: ', error);
      return {
        success: false,
        message: 'Error checking out branch',
        data: error,
      };
    }
  }

  async status(): Promise<ResponseModel> {
    try {
      const statusSummary = await this.git.status();
      console.log('Git Status:\n', statusSummary);
      return {
        success: true,
        message: 'Git status retrieved successfully',
        data: statusSummary,
      };
    } catch (error) {
      console.error('Error getting Git status: ', error);
      return {
        success: false,
        message: 'Error getting Git status',
        data: error,
      };
    }
  }

  async log(): Promise<ResponseModel> {
    try {
      const logSummary = await this.git.log();
      console.log('Git Log:\n', logSummary);
      return {
        success: true,
        message: 'Git log retrieved successfully',
        data: logSummary,
      };
    } catch (error) {
      console.error('Error getting Git log: ', error);
      return { success: false, message: 'Error getting Git log', data: error };
    }
  }
}
