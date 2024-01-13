import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let model: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    model = module.get<Model<Product>>(getModelToken(Product.name));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ];
      jest.spyOn(model, 'find').mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce({
          skip: jest.fn().mockReturnValueOnce({
            limit: jest.fn().mockResolvedValueOnce(products),
          }),
        }),
      } as any);

      const result = await service.findAll();

      expect(result).toEqual(products);
      expect(model.find).toHaveBeenCalledTimes(1);
      expect(model.find).toHaveBeenCalledWith({});
      expect(model.find({}).populate).toHaveBeenCalledTimes(1);
      expect(model.find({}).populate).toHaveBeenCalledWith('brand');
      expect(model.find({}).populate().skip).toHaveBeenCalledTimes(1);
      expect(model.find({}).populate().skip).toHaveBeenCalledWith(0);
      expect(model.find({}).populate().skip().limit).toHaveBeenCalledTimes(1);
      expect(model.find({}).populate().skip().limit).toHaveBeenCalledWith(500);
    });

    it('should apply filters when provided', async () => {
      const products = [
        { id: '1', name: 'Product 1', price: 10 },
        { id: '2', name: 'Product 2', price: 20 },
      ];
      jest.spyOn(model, 'find').mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce({
          skip: jest.fn().mockReturnValueOnce({
            limit: jest.fn().mockResolvedValueOnce(products),
          }),
        }),
      } as any);

      const result = await service.findAll({
        minPrice: 15,
        maxPrice: 25,
        name: 'product',
      });

      expect(result).toEqual([products[1]]);
      expect(model.find).toHaveBeenCalledTimes(1);
      expect(model.find).toHaveBeenCalledWith({
        price: { $gte: 15, $lte: 25 },
        name: new RegExp('product', 'i'),
      });
      expect(
        model.find({
          price: { $gte: 15, $lte: 25 },
          name: new RegExp('product', 'i'),
        }).populate,
      ).toHaveBeenCalledTimes(1);
      expect(
        model.find({
          price: { $gte: 15, $lte: 25 },
          name: new RegExp('product', 'i'),
        }).populate,
      ).toHaveBeenCalledWith('brand');
      expect(
        model
          .find({
            price: { $gte: 15, $lte: 25 },
            name: new RegExp('product', 'i'),
          })
          .populate().skip,
      ).toHaveBeenCalledTimes(1);
      expect(
        model
          .find({
            price: { $gte: 15, $lte: 25 },
            name: new RegExp('product', 'i'),
          })
          .populate().skip,
      ).toHaveBeenCalledWith(0);
      expect(
        model
          .find({
            price: { $gte: 15, $lte: 25 },
            name: new RegExp('product', 'i'),
          })
          .populate()
          .skip().limit,
      ).toHaveBeenCalledTimes(1);
      expect(
        model
          .find({
            price: { $gte: 15, $lte: 25 },
            name: new RegExp('product', 'i'),
          })
          .populate()
          .skip().limit,
      ).toHaveBeenCalledWith(500);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const product = { id: '1', name: 'Product 1' };
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        populate: jest.fn().mockResolvedValueOnce(product),
      } as any);

      const result = await service.findOne('1');

      expect(result).toEqual(product);
      expect(model.findById).toHaveBeenCalledTimes(1);
      expect(model.findById).toHaveBeenCalledWith('1');
      expect(model.findById('1').populate).toHaveBeenCalledTimes(1);
      expect(model.findById('1').populate).toHaveBeenCalledWith('brand');
    });

    it('should throw a NotFoundException if product is not found', async () => {
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        populate: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(service.findOne('1')).rejects.toThrowError(
        new NotFoundException(`Product #1 not found`),
      );
      expect(model.findById).toHaveBeenCalledTimes(1);
      expect(model.findById).toHaveBeenCalledWith('1');
      expect(model.findById('1').populate).toHaveBeenCalledTimes(1);
      expect(model.findById('1').populate).toHaveBeenCalledWith('brand');
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const product: CreateProductDto = { name: 'Product 1', price: 10 };
      const newProduct = { id: '1', ...product };
      jest.spyOn(model, 'create').mockResolvedValueOnce(newProduct as any);

      const result = await service.create(product);

      expect(result).toEqual(newProduct);
      expect(model.create).toHaveBeenCalledTimes(1);
      expect(model.create).toHaveBeenCalledWith(product);
    });
  });

  describe('update', () => {
    it('should update a product by id', async () => {
      const product: UpdateProductDto = { name: 'Product 1', price: 10 };
      const updatedProduct = { id: '1', ...product };
      jest.spyOn(model, 'findOneAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(updatedProduct),
      } as any);

      const result = await service.update('1', product);

      expect(result).toEqual(updatedProduct);
      expect(model.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(model.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: '1' },
        { $set: product },
        { new: true },
      );
      expect(
        model.findOneAndUpdate({ _id: '1' }, { $set: product }, { new: true })
          .exec,
      ).toHaveBeenCalledTimes(1);
    });

    it('should throw a NotFoundException if product is not found', async () => {
      const product: UpdateProductDto = { name: 'Product 1', price: 10 };
      jest.spyOn(model, 'findOneAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(service.update('1', product)).rejects.toThrowError(
        new NotFoundException(`Product #1 not found`),
      );
      expect(model.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(model.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: '1' },
        { $set: product },
        { new: true },
      );
      expect(
        model.findOneAndUpdate({ _id: '1' }, { $set: product }, { new: true })
          .exec,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should delete a product by id', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValueOnce(null as any);

      await service.delete('1');

      expect(model.findByIdAndDelete).toHaveBeenCalledTimes(1);
      expect(model.findByIdAndDelete).toHaveBeenCalledWith({ _id: '1' });
    });
  });
});
