// backend/src/submissions/submissions.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  create(createSubmissionDto: CreateSubmissionDto) {
    return this.prisma.submission.create({
      data: createSubmissionDto,
    });
  }
  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    status?: string,
    type?: string,
  ) {
    const skip = (page - 1) * limit;
    const where: Prisma.SubmissionWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (status && status !== 'TODOS') {
      where.status = status;
    }
    if (type && type !== 'TODOS') {
      where.type = type;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.submission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.submission.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  updateStatus(id: string, updateSubmissionDto: UpdateSubmissionDto) {
    return this.prisma.submission.update({
      where: { id },
      data: { status: updateSubmissionDto.status },
    });
  }
  async getDashboardStats() {
    const total = await this.prisma.submission.count();
    const pending = await this.prisma.submission.count({
      where: { status: 'NUEVO' },
    });

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0); // Establece la hora al inicio del día

    const newToday = await this.prisma.submission.count({
      where: {
        createdAt: {
          gte: startOfToday, // gte = greater than or equal to
        },
      },
    });

    return { total, pending, newToday };
  }
}
