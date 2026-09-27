import { Controller, NotFoundException, Post } from "@nestjs/common";
import { loadConfig } from "@negarin/config";
import { createFoundationQueue, FOUNDATION_QUEUE } from "@negarin/queue";

@Controller("foundation")
export class FoundationController {
  @Post("jobs")
  async enqueueFoundationJob() {
    const config = loadConfig();

    if (config.NODE_ENV === "production") {
      throw new NotFoundException();
    }

    const queue = createFoundationQueue(config.REDIS_URL);

    try {
      const job = await queue.add(
        "smoke",
        { requestedAt: new Date().toISOString() },
        {
          removeOnComplete: 50,
          removeOnFail: 50
        }
      );

      return {
        queue: FOUNDATION_QUEUE,
        jobId: String(job.id)
      };
    } finally {
      await queue.close();
    }
  }
}
