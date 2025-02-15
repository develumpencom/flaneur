class Location < ApplicationRecord
  validates_presence_of :lat, :lon, :tid, :tst
end
