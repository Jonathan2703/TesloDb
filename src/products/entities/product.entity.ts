import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from '../../auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'products'})
export class Product {
    @ApiProperty({
        example:'3324e552-d9c4-46a9-847c-825e4a30624e',
        description: 'The id of the product',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example:'T-Shirt Teslo',
        description: 'The title of the product',
        uniqueItems: true,
    })
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty({
        example:0,
        description: 'The price of the product',
    })
    @Column('float', {
        default: 0,
    })
    price: number;

    @ApiProperty({
        example:'A T-Shirt with the logo of Teslo',
        description: 'The description of the product',
    })
    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @ApiProperty({
        example:'men_3d_small_wordmark_tee',
        description: 'The sku of the product',
        uniqueItems: true,
    })
    @Column('text', {
        unique: true,
    })
    slug: string;

    @ApiProperty({
        example:10,
        description: 'The stock of the product',
        default: 0,
    })
    @Column('int', {
        default: 0,
    })
    stock: number;

    @ApiProperty({
        example:['S', 'M', 'L', 'XL'],
        description: 'The sizes of the product',
    })
    @Column('text', {
        array: true,
    })
    sizes: string[];

    @ApiProperty({
        example:'women',
        description: 'The gender of the product',
    })
    @Column('text')
    gender:string;

    @ApiProperty()
    @Column('text', {
        array: true,
        default: [],
    })
    tags: string[];

    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        {cascade: true, eager: true}
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        (user) => user.product,
        { eager: true }
    )
    user:User

    @BeforeInsert()
    checkSlugInsert(): void {
        if (!this.slug) {
            this.slug = this.title;
        }
        this.slug = this.slug.toLowerCase().replaceAll(' ', '_').replaceAll(/[^\w\s]/gi, '');
    }

    @BeforeUpdate()
    checkSlugUpdate(): void {
        if (this.slug) {
            this.slug = this.slug.toLowerCase().replaceAll(' ', '_').replaceAll(/[^\w\s]/gi, '');
        }
    }

}

