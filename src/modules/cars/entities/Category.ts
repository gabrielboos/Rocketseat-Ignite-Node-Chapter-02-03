import { v4 as uuidv4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("categories")
class Category {

    @PrimaryColumn("id")
    id?: string;

    @Column("name")
    name: string;

    @Column("description")
    description: string;

    @CreateDateColumn("createdcreated_at")
    created_at?: Date;

    constructor(name: string, description: string) {
        if (!this.id) {
            this.id = uuidv4();
        }
        this.name = name;
        this.description = description;
    }
}

export { Category };