import { Exclude } from 'class-transformer'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('users')
class User {
  @PrimaryColumn()
  readonly id: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) this.id = uuid()
  }
}

export { User }
