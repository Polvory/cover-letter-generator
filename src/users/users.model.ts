import { Model, Table, Column, DataType } from "sequelize-typescript";
import { DataTypes } from 'sequelize'


export interface Paid {
    date: string;
    is_paid: boolean;
}

interface UsersCreationAttrs {
    id: string;
    user_id: string | number;
    user_name?: string;
    first_name?: string;
    last_name?: string;
    archive?: boolean;
    options?: JSON;
    paid?: Paid;
    name_to_generate: string;
    achievements: string;
}

@Table({ tableName: 'users' })
export class Users extends Model<Users, UsersCreationAttrs>{

    @Column({ type: DataTypes.STRING, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true })
    id: string;

    @Column({ type: DataType.STRING })
    user_id: string | number;

    @Column({ type: DataType.TEXT })
    user_name: string;

    @Column({ type: DataType.TEXT })
    first_name: string;

    @Column({ type: DataType.TEXT })
    last_name: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    archive: boolean;

    @Column({ type: DataType.JSONB })
    options: JSON;

    @Column({ type: DataType.JSONB, defaultValue: { date: null, paid: false } })
    paid: Paid;

    @Column({ type: DataType.TEXT, defaultValue: "" })
    name_to_generate: string;

    @Column({ type: DataType.TEXT, defaultValue: "" })
    achievements: string;

}
