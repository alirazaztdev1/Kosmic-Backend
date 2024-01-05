import { Global, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../generic-dto/pagination.dto';
import replacingAlies from 'src/helpers/replacing-alies';

/**
 * BaseService
 *
 */
@Injectable()
@Global()
export class BaseRepository<T> {
  /**
   * @param payload
   * @param include
   * @returns
   */
  public async findAllWithPagination(payload: PaginationDto, entity: Repository<T>, include?: any) {
    const records = await entity.find({
      ...(payload.attributes.length && { select: payload.attributes }),
      ...(payload.order.length && { order: payload.order }),
      ...(include && { relations: include }),
      where: replacingAlies(payload.condition),
      skip: (payload.page - 1) * payload.pageSize,
      take: payload.pageSize
    });

    const totalRecords = await entity.count({ where: payload.condition });
    return { data: records, totalRecords: totalRecords };
  }

  // /**
  //  * Find or create
  //  *
  //  * @param condition any
  //  * @param fields any
  //  * @returns Model
  //  */
  // public findOrCreate(condition: any, fields: any) {
  //   return this.findOrCreate({ where: condition, defaults: fields });
  // }

  // /**
  //  * Find and count all by condition
  //  * @param condition any
  //  * @returns Model
  //  */
  public findAndCountAll(condition: any) {
    return this.findAndCountAll({ where: condition });
  }

  /**
   * Create new record.
   *
   * @param fields any
   * @param userId number
   * @returns Model
   */
  // public create(fields: any, userId?: any, include?: any) {
  //   fields['createdBy'] = userId;

  //   return this.create(fields, { include });
  // }

  // /**
  //  * Bulk create new record.
  //  *
  //  * @param fields any
  //  * @param userId number
  //  * @returns Model
  //  */
  // public bulkCreateOrUpdate(fields: any, userId?: any, option?: any) {
  //   if (option) {
  //     fields.forEach((field) => (field['updatedBy'] = userId));
  //   } else {
  //     fields.forEach((field) => (field['createdBy'] = userId));
  //   }
  //   return this.bulkCreate(fields, { ...option });
  // }

  // /**
  //  * Create new record while in transaction mode.
  //  *
  //  * @param fields any
  //  * @param userId number
  //  * @param transaction object
  //  * @returns Model
  //  */
  // public createWithTransaction(fields: any, userId?: any, transaction?: any) {
  //   fields['createdBy'] = userId;

  //   return this.create(fields, { transaction });
  // }
  // /**
  //  * Update new record while in transaction mode.
  //  *
  //  * @param condition any
  //  * @param fields any
  //  * @param userId number
  //  * @param transaction object
  //  * @param returning boolean
  //  * @returns Model
  //  */
  // public updateWithTransaction(
  //   condition: any,
  //   fields: any,
  //   userId?: number,
  //   transaction?: any,
  //   returning?: boolean
  // ) {
  //   fields['updatedBy'] = userId;

  //   return this.update(fields, { where: condition, returning: returning, transaction });
  // }

  // /**
  //  * Update record(s) by condition;
  //  *
  //  * @param condition any
  //  * @param fields any
  //  * @param userId number
  //  * @returns
  //  */
  // public updateByCondition(
  //   condition: any,
  //   fields: any,
  //   userId?: number,
  //   returning?: boolean,
  //   include?: any
  // ) {
  //   fields['updatedBy'] = userId;
  //   return this.update(fields, { where: condition, returning: returning, include });
  // }

  // /**
  //  * Update record(s) by condition;
  //  *
  //  * @param condition any
  //  * @param fields any
  //  * @param userId number
  //  * @returns
  //  */
  // public createOrUpdate(fields: any, userId?: number) {
  //   return this.upsert(fields, { userId, hooks: true });
  // }

  // /**
  //  * Update one record by id
  //  * @param id number
  //  * @param fields any
  //  * @param userId number
  //  * @returns
  //  */
  // public update(id: number, fields: any, userId?: number, returning?: boolean, include?: any) {
  //   return this.updateByCondition({ id: id }, fields, userId, returning, include);
  // }

  // /**
  //  * Delete record(s) by condition
  //  * @param condition any
  //  * @returns
  //  */
  // public deleteByCondition(condition: any) {
  //   return this.destroy({ where: condition });
  // }

  // /**
  //  * Delete one record by id (primary key)
  //  * @param id number
  //  * @returns
  //  */
  // public delete(id: number) {
  //   return this.deleteByCondition({ id: id });
  // }

  // /**
  //  *
  //  * @param origin
  //  * @param destination
  //  * @returns
  //  */
  // public async reorder(origin: number, destination: number, id: number) {
  //   await this.updateByCondition({ sequence: origin }, { sequence: 0 }, id);

  //   if (origin < destination) {
  //     for (let i = origin; i < destination; i++) {
  //       await this.updateByCondition({ sequence: i + 1 }, { sequence: i }, id);
  //     }
  //   } else {
  //     for (let i = origin; i > destination; i--) {
  //       await this.updateByCondition({ sequence: i - 1 }, { sequence: i }, id);
  //     }
  //   }

  //   await this.updateByCondition({ sequence: 0 }, { sequence: destination }, id);

  //   return await this.findAll({}, [['sequence', 'asc']]);
  // }
}
