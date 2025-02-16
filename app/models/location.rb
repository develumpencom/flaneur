class Location < ApplicationRecord
  validates_presence_of :lat, :lon, :tid, :tst

  after_create_commit -> {
    broadcast_prepend_to :locations, target: "locations", partial: "owntracks/location_row", locals: { location: self, broadcasted: true }
  }

  def battery_status
    {
      0 => "unknown",
      1 => "unplugged",
      2 => "charging",
      3 => "full"
    }[self.bs]
  end

  def internet_connectivity_status
    {
      "w" => "wifi",
      "o" => "offline",
      "m" => "mobile"
    }[self.conn]
  end

  def monitoring_mode
    {
      1 => "significant",
      2 => "move"
    }[self.m]
  end
end
