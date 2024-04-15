import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country, CountryCreateInput } from "../entities/Country";

@Resolver(Country)
export class CountryResolver {
  @Query(() => [Country])
  async getCountries(): Promise<Country[]> {
    const countries = await Country.find();
    return countries;
  }

  @Query(() => Country, { nullable: true })
  async getCountryByCode(
    @Arg("code") code: string
  ): Promise<Country | null> {
    const country = await Country.findOne({
      where: { code },
    });
    return country;
  }

  @Query(() => [Country])
  async getCountriesByContinent(
    @Arg("continentCode") continentCode: string
  ): Promise<Country[]> {
    const countries = await Country.find({
      where: { continentCode },
    });
    return countries;
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg("data", () => CountryCreateInput) data: CountryCreateInput
  ): Promise<Country> {
    const newCountry = new Country();
    Object.assign(newCountry, data);
    await newCountry.save();
    return newCountry;
  }
}
