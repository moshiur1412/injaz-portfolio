<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('sections', function (Blueprint $table) {
            $table->dropColumn('show_in_menu');
        });
    }

    public function down()
    {
        Schema::table('sections', function (Blueprint $table) {
            $table->boolean('show_in_menu')->default(true)->after('is_visible');
        });
    }
};
