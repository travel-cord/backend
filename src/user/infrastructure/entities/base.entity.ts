import { AfterInsert, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn, VersionColumn } from 'typeorm'

export class BaseEntity {
  @CreateDateColumn()
  @AfterInsert()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date

  @DeleteDateColumn()
  deleteAt: Date | null

  @VersionColumn()
  version: number
}
