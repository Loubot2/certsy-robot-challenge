class API::V1::RobotPositionsController < ApplicationController
  before_action :set_robot_position, only: %i[ show update destroy ]

  # GET /robot_positions
  def index
    @robot_positions = RobotPosition.all

    render json: @robot_positions
  end

  # GET /robot_positions/1
  def show
    render json: @robot_position
  end

  # POST /robot_positions
  def create
    @robot_position = RobotPosition.new(robot_position_params)

    if @robot_position.save
      render json: @robot_position, status: :created, location: @robot_position
    else
      render json: @robot_position.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /robot_positions/1
  def update
    if @robot_position.update(robot_position_params)
      render json: @robot_position
    else
      render json: @robot_position.errors, status: :unprocessable_entity
    end
  end

  # DELETE /robot_positions/1
  def destroy
    @robot_position.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_robot_position
      @robot_position = RobotPosition.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def robot_position_params
      params.require(:robot_position).permit(:x, :y, :orientation)
    end
end
