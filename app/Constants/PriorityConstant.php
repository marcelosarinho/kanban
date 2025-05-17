<?php

namespace App\Constants;

final class PriorityConstant {
  const LOW = 'low';
  const MEDIUM = 'medium';
  const HIGH = 'high';

  private static $string = [
    self::LOW => 'Baixa',
    self::MEDIUM => 'Média',
    self::HIGH => 'Alta',
  ];

  public static function toString($value) {
    return self::$string[$value] ?? 'Desconhecida';
  }

  public static function toArray() {
    return [
      self::LOW,
      self::MEDIUM,
      self::HIGH,
    ];
  }

  public static function toArrayAssoc() {
    return [
      self::LOW => self::toString(self::LOW),
      self::MEDIUM => self::toString(self::MEDIUM),
      self::HIGH => self::toString(self::HIGH),
    ];
  }
}