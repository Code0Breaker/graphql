import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { OrderByParams } from '../graphql';

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService) {}
  create(createDonationInput: Prisma.DonationCreateInput) {
    return this.prisma.donation.create({
      data: createDonationInput,
    });
  }

  async findAll(orderBy?: OrderByParams) {
    const { field = 'createdAt', direction = 'desc' } = orderBy || {};
    return this.prisma.donation.findMany({
      orderBy: { [field]: direction },
    });
  }

  async getTotal() {
    const response = await this.prisma.donation.aggregate({
      _sum: {
        count: true,
      },
    });
    return response._sum.count;
  }

  findOne(donationWhereUniqueInput: Prisma.DonationWhereUniqueInput) {
    return this.prisma.donation.findUnique({
      where: donationWhereUniqueInput,
    });
  }

  update(id: number, updateDonationInput) {
    return `This action updates a #${id} donation`;
  }
}
