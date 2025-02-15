class OwntracksController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [ :create ]

  def index
    @locations = Location.order(tst: :desc).limit(100)
  end

  def create
    case params[:owntrack][:_type]
    when "location" then create_location
    when "status" then log_status
    else
        render json: { error: "Invalid _type" }, status: :bad_request
    end
  end

  private

  def owntracks_params
    expected_params = case params[:_type]
    when "location" then location_params
    when "status" then status_params
    else []
    end

    params.expect(owntrack: expected_params)
          .transform_keys { |key| key == "created_at" ? "owntracks_created_at" : key }
          .tap { |p| p[:owntracks_created_at] = Time.at(p[:owntracks_created_at]) if p[:owntracks_created_at] }
  end

  def location_params
    [
      :acc,
      :alt,
      :batt,
      :bs,
      :cog,
      :lat,
      :lon,
      :rad,
      :t,
      :tid,
      :tst,
      :vac,
      :vel,
      :p,
      :poi,
      :image,
      :imagename,
      :conn,
      :tag,
      :topic,
      :ssid,
      :bssid,
      :created_at,
      :m,
      :_id,
      inregions: [],
      inrids: []
    ]
  end

  def status_params
    [
       :_id,
      iOS: [
        :altimeterAuthorizationStatus,
        :altimeterIsRelativeAltitudeAvailable,
        :backgroundRefreshStatus,
        :deviceIdentifierForVendor,
        :deviceModel,
        :deviceSystemName,
        :deviceSystemVersion,
        :deviceUserInterfaceIdiom,
        :locale,
        :localeUsesMetricSystem,
        :locationManagerAuthorizationStatus,
        :version
      ],
      android: [
        :hib,
        :bo,
        :loc,
        :ps,
        :wifi
      ]
    ]
  end

  def create_location
    location = Location.new(owntracks_params)

    if location.save
      render json: { message: "Location created" }, status: :created
    else
      render json: { error: location.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  def log_status
    logger.info "[Owntracks::Status]: #{owntracks_params}"
    head :ok
  end
end
