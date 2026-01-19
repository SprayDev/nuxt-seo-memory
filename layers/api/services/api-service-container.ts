import type ApplicationService from '#layers/api/services/application-service'
import type AuthenticationService from '#layers/api/services/authentication-service'
import type FileService from '#layers/api/services/file-service'
import type ShopService from '#layers/api/services/shop-service'
import type ReviewService from '#layers/api/services/review-service'
import type BlogService from '#layers/api/services/blog-service'
import type ProfileService from '#layers/api/services/profile-service'
import type ShopAyahooService from '#layers/api/services/shop-ayahoo-service'
import type ShopMercariService from '#layers/api/services/shop-mercari-service'
import type ShopCartService from '#layers/api/services/shop-cart-service'
import type CalculatorService from '#layers/api/services/calculator-service'
import type UserDestinationService from '#layers/api/services/user/user-destination-service'
import type GeoService from '#layers/api/services/geo-service'
import type UserDepositService from '#layers/api/services/user/user-deposit-service'
import type UserParcelService from '#layers/api/services/user/user-parcel-service'
import type UserOrderService from '#layers/api/services/user/user-order-service'
import type { FaqsService } from '#layers/api/services/faq-service'
import type UserBidService from '#layers/api/services/user/user-bid-service'
import type { UserFavoritesService } from '#layers/api/services/user/user-favorites-service'
import type MessengerService from '#layers/api/services/messenger-service'
import type { UserFeedbackService } from '#layers/api/services/user/user-feedback'
import type UserAffiliateService from '#layers/api/services/user/user-affiliate-service'
import type ShopRakumaService from '#layers/api/services/shop-rakuma-service'
import type { UserSeaService } from '#layers/api/services/user/user-sea-service'
import type SendicoCategoryService from '#layers/api/services/sendico-category-service'
import type ShipmentDetailsService from '#layers/api/services/shipment-details-service'
import type ShopAmazonService from '#layers/api/services/shop-amazon-service'
import type { UserSearchService } from '#layers/api/services/user/user-search-service'
import type ShopHardoffService from '#layers/api/services/shop-hardoff-service'
import type UserRecommendationsService from '#layers/api/services/user/user-recommendations-service'

export interface ApiServiceContainer {
  application: ApplicationService
  authentication: AuthenticationService
  file: FileService
  shop: ShopService
  review: ReviewService
  blog: BlogService
  profile: ProfileService
  shopAyahoo: ShopAyahooService
  shopMercari: ShopMercariService
  shopAmazon: ShopAmazonService
  shopRakuma: ShopRakumaService
  shopHardoff: ShopHardoffService
  shopCart: ShopCartService
  messenger: MessengerService
  calculator: CalculatorService
  sendicoCategory: SendicoCategoryService
  user: {
    destination: UserDestinationService
    search: UserSearchService
    recommendations: UserRecommendationsService
    deposit: UserDepositService
    parcel: UserParcelService
    order: UserOrderService
    bid: UserBidService
    favorites: UserFavoritesService
    feedback: UserFeedbackService
    affiliate: UserAffiliateService
    sea: UserSeaService
  }
  geo: GeoService
  faqs: FaqsService
  shipmentDetails: ShipmentDetailsService
}
