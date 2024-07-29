/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { GenerationLogService } from "../generationLog.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { GenerationLogCreateInput } from "./GenerationLogCreateInput";
import { GenerationLog } from "./GenerationLog";
import { GenerationLogFindManyArgs } from "./GenerationLogFindManyArgs";
import { GenerationLogWhereUniqueInput } from "./GenerationLogWhereUniqueInput";
import { GenerationLogUpdateInput } from "./GenerationLogUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class GenerationLogControllerBase {
  constructor(
    protected readonly service: GenerationLogService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: GenerationLog })
  @nestAccessControl.UseRoles({
    resource: "GenerationLog",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createGenerationLog(
    @common.Body() data: GenerationLogCreateInput
  ): Promise<GenerationLog> {
    return await this.service.createGenerationLog({
      data: {
        ...data,

        packageField: data.packageField
          ? {
              connect: data.packageField,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        id: true,
        logLine: true,

        packageField: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [GenerationLog] })
  @ApiNestedQuery(GenerationLogFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "GenerationLog",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async generationLogs(
    @common.Req() request: Request
  ): Promise<GenerationLog[]> {
    const args = plainToClass(GenerationLogFindManyArgs, request.query);
    return this.service.generationLogs({
      ...args,
      select: {
        createdAt: true,
        id: true,
        logLine: true,

        packageField: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: GenerationLog })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "GenerationLog",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async generationLog(
    @common.Param() params: GenerationLogWhereUniqueInput
  ): Promise<GenerationLog | null> {
    const result = await this.service.generationLog({
      where: params,
      select: {
        createdAt: true,
        id: true,
        logLine: true,

        packageField: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: GenerationLog })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "GenerationLog",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateGenerationLog(
    @common.Param() params: GenerationLogWhereUniqueInput,
    @common.Body() data: GenerationLogUpdateInput
  ): Promise<GenerationLog | null> {
    try {
      return await this.service.updateGenerationLog({
        where: params,
        data: {
          ...data,

          packageField: data.packageField
            ? {
                connect: data.packageField,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          id: true,
          logLine: true,

          packageField: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: GenerationLog })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "GenerationLog",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteGenerationLog(
    @common.Param() params: GenerationLogWhereUniqueInput
  ): Promise<GenerationLog | null> {
    try {
      return await this.service.deleteGenerationLog({
        where: params,
        select: {
          createdAt: true,
          id: true,
          logLine: true,

          packageField: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
