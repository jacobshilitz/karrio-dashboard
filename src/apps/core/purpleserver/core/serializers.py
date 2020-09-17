from enum import Enum
from drf_yasg import openapi
from purpleserver.providers.models import MODELS
from purplship.core.units import (
    Country, WeightUnit, DimensionUnit, PackagingUnit, PaymentType, Currency, PrinterType
)
from rest_framework.serializers import (
    Serializer, CharField, FloatField,
    BooleanField, IntegerField, ListField,
    ChoiceField, DictField, URLField, NullBooleanField
)

CARRIERS = [(k, k) for k in MODELS.keys()]
COUNTRIES = [(c.name, c.name) for c in list(Country)]
CURRENCIES = [(c.name, c.name) for c in list(Currency)]
WEIGHT_UNIT = [(c.name, c.name) for c in list(WeightUnit)]
DIMENSION_UNIT = [(c.name, c.name) for c in list(DimensionUnit)]
PACKAGING_UNIT = [(c.name, c.name) for c in list(PackagingUnit)]
PAYMENT_TYPES = [(c.name, c.name) for c in list(PaymentType)]
PRINTER_TYPES = [(c.name, c.name) for c in list(PrinterType)]


class ShipmentStatus(Enum):
    created = 'created'
    cancelled = 'cancelled'
    purchased = 'purchased'


SHIPMENT_STATUS = [(c.name, c.name) for c in list(ShipmentStatus)]


class StringListField(ListField):
    child = CharField()


class PlainDictField(DictField):
    class Meta:
        swagger_schema_fields = {
            "type": openapi.TYPE_OBJECT,
            "additional_properties": True,
        }


class EntitySerializer(Serializer):
    id = CharField(required=False, help_text="A unique identifier")


class CarrierSettings(Serializer):
    id = CharField(required=True, help_text="A unique address identifier")
    carrier_name = ChoiceField(choices=CARRIERS, required=True, help_text="Indicates a carrier (type)")
    carrier_id = CharField(required=True, help_text="Indicates a specific carrier configuration name.")
    test = BooleanField(required=True, help_text="""
    The test flag indicates whether to use a carrier configured for test. 
    """)


class TestFilters(Serializer):
    test = NullBooleanField(required=False, default=False, help_text="""
    The test flag indicates whether to use a carrier configured for test. 
    """)


class AddressData(Serializer):

    postal_code = CharField(required=False, allow_blank=True, allow_null=True, help_text="The address postal code")
    city = CharField(required=False, allow_blank=True, allow_null=True, help_text="""
    The address city. <br/>
    **(required to create as shipment)**
    """)
    federal_tax_id = CharField(required=False, allow_blank=True, allow_null=True, help_text="The party frederal tax id")
    state_tax_id = CharField(required=False, allow_blank=True, allow_null=True, help_text="The party state id")
    person_name = CharField(required=False, allow_blank=True, allow_null=True, help_text="""
    attention to <br/>
    **(required to create as shipment)**
    """)
    company_name = CharField(required=False, allow_blank=True, allow_null=True, help_text="The company name if the party is a company")
    country_code = ChoiceField(required=True, choices=COUNTRIES, help_text="The address country code")
    email = CharField(required=False, allow_blank=True, allow_null=True, help_text="The party email")
    phone_number = CharField(required=False, allow_blank=True, allow_null=True, help_text="""
    The party phone number.<br/>
    Note that the expected format is: **1 514 0000000**
    
    Country Code | Area Code | Phone
    --- | --- | ---
    1 | 514 | 0000000
    """)

    state_code = CharField(required=False, allow_blank=True, allow_null=True, help_text="The address state code")
    suburb = CharField(required=False, allow_blank=True, allow_null=True, help_text="The address suburb if known")
    residential = BooleanField(
        required=False,
        help_text="Indicate if the address is residential or commercial (enterprise)"
    )

    address_line1 = CharField(required=False, allow_blank=True, allow_null=True, help_text="""
    The address line with street number <br/>
    **(required to create as shipment)**
    """)
    address_line2 = CharField(required=False, allow_blank=True, allow_null=True, help_text="The address line with suite number")


class Address(EntitySerializer, AddressData):
    pass


class CommodityData(Serializer):

    weight = FloatField(required=False, allow_null=True, help_text="The commodity's weight")
    description = CharField(required=False, allow_blank=True, allow_null=True, help_text="A description of the commodity")
    quantity = IntegerField(required=False, allow_null=True, help_text="The commodity's quantity (number or item)")
    sku = CharField(required=False, allow_blank=True, allow_null=True, help_text="The commodity's sku number")
    value_amount = FloatField(required=False, allow_null=True, help_text="The monetary value of the commodity")
    value_currency = CharField(required=False, allow_blank=True, allow_null=True, help_text="The currency of the commodity value amount")
    origin_country = CharField(required=False, allow_blank=True, allow_null=True, help_text="The origin or manufacture country")


class Commodity(EntitySerializer, AddressData):
    pass


class ParcelData(Serializer):
    weight = FloatField(required=False, allow_null=True, help_text="The parcel's weight")
    width = FloatField(required=False, allow_null=True, help_text="The parcel's width")
    height = FloatField(required=False, allow_null=True, help_text="The parcel's height")
    length = FloatField(required=False, allow_null=True, help_text="The parcel's length")
    packaging_type = CharField(required=False, allow_blank=True, allow_null=True, help_text=f"""
    The parcel's packaging type.
    
    **Note that the packaging is optional when using a package preset**
    
    values: <br/>- {'<br/>- '.join([f'**{pkg}**' for pkg, _ in PACKAGING_UNIT])}
    
    For specific carriers packaging type, please consult [the reference](#operation/all_references).
    """)
    package_preset = CharField(required=False, allow_blank=True, allow_null=True, help_text="""
    The parcel's package preset.
    
    For specific carriers package preset, please consult [the reference](#operation/all_references).
    """)
    description = CharField(required=False, allow_blank=True, allow_null=True, help_text="The parcel's description")
    content = CharField(required=False, allow_blank=True, allow_null=True, help_text="The parcel's content description")
    is_document = BooleanField(required=False, allow_null=True, default=False, help_text="Indicates if the parcel is composed of documents only")
    weight_unit = ChoiceField(required=False, allow_blank=True, allow_null=True, choices=WEIGHT_UNIT, help_text="The parcel's weight unit")
    dimension_unit = ChoiceField(required=False, allow_blank=True, allow_null=True, choices=DIMENSION_UNIT, help_text="The parcel's dimension unit")


class Parcel(EntitySerializer, ParcelData):
    pass


class Invoice(Serializer):

    date = CharField(required=True, help_text="The invoice date")
    identifier = CharField(required=False, allow_blank=True, allow_null=True, help_text="The internal invoice document identifier")
    type = CharField(required=False, allow_blank=True, allow_null=True, help_text="The invoice type")
    copies = IntegerField(required=False, allow_null=True, help_text="The number of invoice copies")


class Card(Serializer):

    type = CharField(required=True, help_text="The credit card type")
    number = CharField(required=True, help_text="The credit card number")
    expiry_month = CharField(required=True, help_text="The credit card expiry month (MM)")
    expiry_year = CharField(required=True, help_text="The credit card expiry year (YYYY)")
    security_code = CharField(required=True, help_text="The credit card security code often at the back (000)")
    name = CharField(required=False, allow_blank=True, allow_null=True, help_text="The name inscribed on the credit card")
    postal_code = CharField(required=False, allow_blank=True, allow_null=True, help_text="The credit card registration address postal code")


class PaymentData(Serializer):

    paid_by = ChoiceField(required=True, choices=PAYMENT_TYPES, help_text="The payment payer")
    amount = FloatField(required=False, allow_null=True, help_text="The payment amount if known")
    currency = ChoiceField(required=True, choices=CURRENCIES, help_text="The payment amount currency")
    account_number = CharField(required=False, allow_blank=True, allow_null=True, help_text="The selected rate carrier payer account number")
    credit_card = Card(required=False, allow_null=True, help_text="The payment credit card for payment by card")
    contact = Address(required=False, allow_null=True, help_text="The billing address")


class Payment(EntitySerializer, PaymentData):
    pass


class CustomsData(Serializer):

    no_eei = CharField(required=False, allow_blank=True, allow_null=True)
    aes = CharField(required=False, allow_blank=True, allow_null=True)
    description = CharField(required=False, allow_blank=True, allow_null=True)
    terms_of_trade = CharField(required=False, allow_null=True, help_text="The customs 'term of trade' also known as 'incoterm'")
    commodities = ListField(child=Commodity(), required=False, allow_null=True, help_text="The parcel content items")
    duty = Payment(required=False, allow_null=True, help_text="""
    The payment details.<br/>
    Note that this is required for a Dutiable parcel shipped internationally.
    """)
    invoice = Invoice(required=False, allow_null=True, help_text="The shipment invoice required for commercial shipment.")
    commercial_invoice = BooleanField(required=False, allow_null=True, help_text="Indicates if the shipment is commercial")


class Customs(EntitySerializer, CustomsData):
    pass


class Doc(Serializer):

    type = CharField(required=True, help_text="The document type")
    image = CharField(required=True, help_text="encoded base64 string of the document")
    format = CharField(required=False, allow_blank=True, allow_null=True, help_text="The document format")


class COD(Serializer):

    amount = FloatField(required=True, help_text="The amount to collect on delivery")


class Notification(Serializer):

    email = CharField(required=False, allow_blank=True, allow_null=True, help_text="""
    The alternative notification email.
    
    Note that by default the recipient email will be used.
    """)
    locale = CharField(required=False, allow_blank=True, allow_null=True, default='en')


class Insurance(Serializer):

    amount = FloatField(required=True, allow_null=True, help_text="The insurance coverage amount.")


class RateRequest(Serializer):
    shipper = Address(required=True, help_text="""
    The address of the party
    
    Origin address (ship from) for the **shipper**<br/>
    Destination address (ship to) for the **recipient**
    """)
    recipient = Address(required=True, help_text="""
    The address of the party
    
    Origin address (ship from) for the **shipper**<br/>
    Destination address (ship to) for the **recipient**
    """)
    parcels = ListField(child=Parcel(), required=True, help_text="The shipment's parcels")

    services = StringListField(required=False, allow_null=True, help_text="""
    The requested carrier service for the shipment.<br/>
    Please consult [the reference](#operation/all_references) for specific carriers services.
    
    Note that this is a list because on a Multi-carrier rate request you could specify a service per carrier.
    """)
    options = PlainDictField(required=False, allow_null=True, help_text=f"""
    The options available for the shipment.

    Please consult [the reference](#operation/all_references) for additional specific carriers options.
    """)
    reference = CharField(required=False, allow_blank=True, allow_null=True, help_text="The shipment reference")
    carrier_ids = StringListField(required=False, allow_null=True, help_text="""
    The list of configured carriers you wish to get rates from.
    """)


class TrackingRequest(Serializer):

    tracking_numbers = StringListField(required=True, help_text="a list of tracking numbers to fetch.")
    language_code = CharField(required=False, allow_blank=True, allow_null=True, default="en", help_text="The tracking details language code")
    level_of_details = CharField(required=False, allow_blank=True, allow_null=True, help_text="The level of event details.")


class PickupRequest(Serializer):

    date = CharField(required=True, help_text="The expected pickup date")
    address = Address(required=True, help_text="The pickup address")
    parcels = ListField(child=Parcel(), required=False, allow_null=True, help_text="The shipment parcels to pickup.")

    ready_time = CharField(required=True, help_text="The ready time for pickup.")
    closing_time = CharField(required=True, help_text="The closing or late time of the pickup")
    instruction = CharField(required=False, allow_blank=True, allow_null=True, help_text="""
    The pickup instruction.
    
    eg: Handle with care.
    """)
    package_location = CharField(required=False, allow_blank=True, allow_null=True, help_text="""
    The package(s) location.
    
    eg: Behind the entrance door.
    """)


class PickupUpdateRequest(Serializer):

    date = CharField(required=True, help_text="The expected pickup date")
    address = Address(required=True, help_text="The pickup address")
    parcels = ListField(child=Parcel(), required=False, allow_null=True, help_text="The shipment parcels to pickup.")

    confirmation_number = CharField(required=True, help_text="pickup identification number")

    ready_time = CharField(required=True, help_text="The ready time for pickup.")
    closing_time = CharField(required=True, help_text="The closing or late time of the pickup")
    instruction = CharField(required=False, allow_blank=True, allow_null=True, help_text="""
    The pickup instruction.
    
    eg: Handle with care.
    """)
    package_location = CharField(required=False, allow_blank=True, allow_null=True, help_text="""
    The package(s) location.
    
    eg: Behind the entrance door.
    """)


class PickupCancellationRequest(Serializer):

    pickup_date = CharField(required=True, help_text="The expected pickup date")
    confirmation_number = CharField(required=True, help_text="pickup identification number")
    person_name = CharField(required=False, allow_blank=True, allow_null=True, help_text="responsible party name")
    country_code = ChoiceField(required=False, allow_blank=True, allow_null=True, choices=COUNTRIES, help_text="pickup address country code")


class Message(Serializer):

    carrier_name = CharField(required=True, help_text="The targeted carrier")
    carrier_id = CharField(required=True, help_text="The targeted carrier name (unique identifier)")
    message = CharField(required=False, help_text="The error or warning message")
    code = CharField(required=False, help_text="The message code")
    details = DictField(required=False, help_text="any additional details")


class Charge(Serializer):

    name = CharField(required=False, allow_blank=True, allow_null=True, help_text="The charge description")
    amount = FloatField(required=False, allow_null=True, help_text="The charge monetary value")
    currency = CharField(required=False, allow_blank=True, allow_null=True, help_text="The charge amount currency")


class TrackingEvent(Serializer):

    date = CharField(required=True, help_text="The tracking event's date")
    description = CharField(required=True, help_text="The tracking event's description")
    location = CharField(required=True, help_text="The tracking event's location")
    code = CharField(required=False, allow_blank=True, allow_null=True, help_text="The tracking event's code")
    time = CharField(required=False, allow_blank=True, allow_null=True, help_text="The tracking event's time")
    signatory = CharField(required=False, allow_blank=True, allow_null=True, help_text="The tracking signature on delivery")


class Rate(EntitySerializer):

    carrier_name = CharField(required=True, help_text="The rate's carrier")
    carrier_id = CharField(required=True, help_text="The targeted carrier's name (unique identifier)")
    currency = CharField(required=True, help_text="The rate monetary values currency code")
    service = CharField(required=False, allow_blank=True, allow_null=True, help_text="The carrier's rate (quote) service")
    discount = FloatField(required=False, allow_null=True, help_text="The monetary amount of the discount on the rate")
    base_charge = FloatField(default=0.0, help_text="""
    The rate's monetary amount of the base charge.<br/>
    This is the net amount of the rate before additional charges
    """)
    total_charge = FloatField(default=0.0, help_text="""
    The rate's monetary amount of the total charge.<br/>
    This is the gross amount of the rate after adding the additional charges
    """)
    duties_and_taxes = FloatField(required=False, allow_null=True, help_text="The monetary amount of the duties and taxes if applied")
    transit_days = IntegerField(required=False, allow_null=True, help_text="The estimated delivery transit days")
    extra_charges = ListField(child=Charge(), required=False, allow_null=True, help_text="list of the rate's additional charges")
    meta = PlainDictField(required=False, allow_null=True, help_text="provider specific metadata")

    carrier_ref = CharField(required=False, allow_blank=True, allow_null=True, help_text="The system carrier configuration id")


class TrackingDetails(Serializer):

    carrier_name = CharField(required=True, help_text="The tracking carrier")
    carrier_id = CharField(required=True, help_text="The tracking carrier configured identifier")
    tracking_number = CharField(required=True, help_text="The shipment tracking number")
    events = ListField(child=TrackingEvent(), required=False, allow_null=True, help_text="The tracking details events")


class TrackingStatus(EntitySerializer, TrackingDetails):
    shipment_id = CharField(required=False, allow_blank=True, allow_null=True, help_text="The system shipment associated.")


class PickupDetails(Serializer):

    id = CharField(required=False, help_text="A unique pickup identifier")
    carrier_name = CharField(required=True, help_text="The pickup carrier")
    carrier_id = CharField(required=True, help_text="The pickup carrier configured name")
    confirmation_number = CharField(required=True, help_text="The pickup confirmation identifier")
    pickup_date = CharField(required=False, allow_null=True, help_text="The pickup date")
    pickup_charge = Charge(required=False, allow_null=True, help_text="The pickup cost details")
    ready_time = CharField(required=False, allow_null=True, help_text="The pickup expected ready time")
    closing_time = CharField(required=False, allow_null=True, help_text="The pickup expected closing or late time")


class ShippingData(Serializer):
    shipper = AddressData(required=True, help_text="""
    The address of the party
    
    Origin address (ship from) for the **shipper**<br/>
    Destination address (ship to) for the **recipient**
    """)
    recipient = AddressData(required=True, help_text="""
    The address of the party
    
    Origin address (ship from) for the **shipper**<br/>
    Destination address (ship to) for the **recipient**
    """)
    parcels = ListField(child=ParcelData(), required=True, help_text="The shipment's parcels")
    options = PlainDictField(required=False, allow_null=True, help_text="""
    The options available for the shipment.<br/>
    Please consult [the reference](#operation/all_references) for additional specific carriers options.
    """)
    payment = PaymentData(required=False, allow_null=True, help_text="The payment details")
    customs = CustomsData(required=False, allow_null=True, help_text="""
    The customs details.<br/>
    Note that this is required for the shipment of an international Dutiable parcel.
    """)
    doc_images = ListField(child=Doc(), required=False, allow_null=True, help_text="""
    The list of documents to attach for a paperless interantional trade.
    
    eg: Invoices...
    """)
    reference = CharField(required=False, allow_blank=True, allow_null=True, help_text="The shipment reference")


class ShippingRequest(ShippingData):
    selected_rate_id = CharField(required=True, help_text="The shipment selected rate.")
    rates = ListField(child=Rate(), help_text="The list for shipment rates fetched previously")
    payment = Payment(required=True, help_text="The payment details")


class ShipmentData(ShippingData):
    services = StringListField(required=False, allow_null=True, help_text="""
    The requested carrier service for the shipment.

    Please consult [the reference](#operation/all_references) for specific carriers services.<br/>
    Note that this is a list because on a Multi-carrier rate request you could specify a service per carrier.
    """)
    carrier_ids = StringListField(required=False, allow_null=True, help_text="""
    The list of configured carriers you wish to get rates from.
    
    *Note that the request will be sent to all carriers in nothing is specified*
    """)


class ShipmentContent(Serializer):

    # Process result properties

    status = ChoiceField(
        required=False, default=ShipmentStatus.created.value, choices=SHIPMENT_STATUS, help_text="The current Shipment status")

    carrier_name = CharField(required=False, allow_blank=True, allow_null=True, help_text="The shipment carrier")
    carrier_id = CharField(required=False, allow_blank=True, allow_null=True, help_text="The shipment carrier configured identifier")
    label = CharField(required=False, allow_blank=True, allow_null=True, help_text="The shipment label in base64 string")
    tracking_number = CharField(required=False, allow_blank=True, allow_null=True, help_text="The shipment tracking number")
    selected_rate = Rate(required=False, allow_null=True, help_text="The shipment selected rate")

    selected_rate_id = CharField(required=False, allow_blank=True, allow_null=True, help_text="The shipment selected rate.")
    rates = ListField(required=False, allow_null=True, child=Rate(), help_text="The list for shipment rates fetched previously")
    tracking_url = URLField(required=False, allow_blank=True, allow_null=True, help_text="The shipment tracking url")

    # Request properties

    shipper = Address(required=True, help_text="""
    The address of the party

    Origin address (ship from) for the **shipper**<br/>
    Destination address (ship to) for the **recipient**
    """)
    recipient = Address(required=True, help_text="""
    The address of the party

    Origin address (ship from) for the **shipper**<br/>
    Destination address (ship to) for the **recipient**
    """)
    parcels = ListField(child=Parcel(), required=True, help_text="The shipment's parcels")

    services = StringListField(required=False, allow_null=True, help_text="""
    The requested carrier service for the shipment.

    Please consult [the reference](#operation/all_references) for specific carriers services.<br/>
    Note that this is a list because on a Multi-carrier rate request you could specify a service per carrier.
    """)
    options = PlainDictField(required=False, allow_null=True, help_text="""
    The options available for the shipment.<br/>
    Please consult [the reference](#operation/all_references) for additional specific carriers options.
    """)

    payment = Payment(required=False, allow_null=True, help_text="The payment details")
    customs = Customs(required=False, allow_null=True, help_text="""
    The customs details.<br/>
    Note that this is required for the shipment of an international Dutiable parcel.
    """)
    doc_images = ListField(child=Doc(), required=False, allow_null=True, help_text="""
    The list of documents to attach for a paperless interantional trade.

    eg: Invoices...
    """)
    reference = CharField(required=False, allow_blank=True, allow_null=True, help_text="The shipment reference")
    carrier_ids = StringListField(required=False, allow_null=True, help_text="""
    The list of configured carriers you wish to get rates from.

    *Note that the request will be sent to all carriers in nothing is specified*
    """)
    meta = PlainDictField(required=False, allow_null=True, help_text="provider specific metadata")


class Shipment(EntitySerializer, ShipmentContent):
    pass


class RateResponse(Serializer):
    messages = ListField(child=Message(), required=False, help_text="The list of note, error or warning messages")
    rates = ListField(child=Rate(), help_text="The list of returned rates")


class ShipmentResponse(Serializer):
    messages = ListField(child=Message(), required=False, help_text="The list of note or warning messages")
    shipment = Shipment(required=False, help_text="The submitted shipment's summary")


class TrackingResponse(Serializer):
    messages = ListField(child=Message(), required=False, help_text="The list of note or warning messages")
    tracking_details = TrackingDetails(required=False, help_text="The tracking details retrieved")


class ErrorResponse(Serializer):
    messages = ListField(child=Message(), required=False, help_text="The list of error messages")
