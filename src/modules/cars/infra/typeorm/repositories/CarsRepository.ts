import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  public async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }
  public async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }

  public async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand });
    }

    if (name) {
      carsQuery.andWhere("name = :name", { name });
    }

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  public async findById(id: string): Promise<Car> {
    return this.repository.findOne({ id });
  }
}

export { CarsRepository };
